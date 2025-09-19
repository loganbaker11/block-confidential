// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract BlockConfidential is SepoliaConfig {
    using FHE for *;
    
    struct TradeOrder {
        euint32 orderId;
        euint32 amount;
        euint32 price;
        euint8 orderType; // 0 = buy, 1 = sell
        ebool isActive;
        address trader;
        uint256 timestamp;
        string symbol;
    }
    
    struct TradeExecution {
        euint32 executionId;
        euint32 buyOrderId;
        euint32 sellOrderId;
        euint32 executedAmount;
        euint32 executedPrice;
        address buyer;
        address seller;
        uint256 timestamp;
    }
    
    struct Portfolio {
        euint32 totalValue;
        euint32 availableBalance;
        euint32 lockedBalance;
        euint32 totalTrades;
        euint32 successfulTrades;
    }
    
    mapping(uint256 => TradeOrder) public orders;
    mapping(uint256 => TradeExecution) public executions;
    mapping(address => Portfolio) public portfolios;
    mapping(address => euint32) public traderReputation;
    mapping(string => euint32) public marketPrices;
    
    uint256 public orderCounter;
    uint256 public executionCounter;
    
    address public owner;
    address public feeCollector;
    uint256 public tradingFee; // in basis points (100 = 1%)
    
    event OrderCreated(uint256 indexed orderId, address indexed trader, string symbol, uint8 orderType);
    event OrderExecuted(uint256 indexed executionId, uint256 indexed buyOrderId, uint256 indexed sellOrderId);
    event OrderCancelled(uint256 indexed orderId, address indexed trader);
    event PortfolioUpdated(address indexed trader, uint32 totalValue);
    event ReputationUpdated(address indexed trader, uint32 reputation);
    
    constructor(address _feeCollector, uint256 _tradingFee) {
        owner = msg.sender;
        feeCollector = _feeCollector;
        tradingFee = _tradingFee;
    }
    
    function createOrder(
        string memory _symbol,
        externalEuint32 _amount,
        externalEuint32 _price,
        uint8 _orderType,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(_orderType == 0 || _orderType == 1, "Invalid order type");
        require(bytes(_symbol).length > 0, "Symbol cannot be empty");
        
        uint256 orderId = orderCounter++;
        
        // Decrypt and validate the amount and price
        euint32 amount = FHE.decrypt(_amount, inputProof);
        euint32 price = FHE.decrypt(_price, inputProof);
        
        // Validate that amount and price are positive
        ebool amountValid = amount.gt(FHE.asEuint32(0));
        ebool priceValid = price.gt(FHE.asEuint32(0));
        ebool bothValid = amountValid.and(priceValid);
        
        require(FHE.decrypt(bothValid), "Amount and price must be positive");
        
        orders[orderId] = TradeOrder({
            orderId: FHE.asEuint32(0), // Will be set properly
            amount: amount,
            price: price,
            orderType: FHE.asEuint8(_orderType),
            isActive: FHE.asEbool(true),
            trader: msg.sender,
            timestamp: block.timestamp,
            symbol: _symbol
        });
        
        emit OrderCreated(orderId, msg.sender, _symbol, _orderType);
        return orderId;
    }
    
    function executeTrade(
        uint256 _buyOrderId,
        uint256 _sellOrderId,
        externalEuint32 _executedAmount,
        externalEuint32 _executedPrice,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(orders[_buyOrderId].trader != address(0), "Buy order does not exist");
        require(orders[_sellOrderId].trader != address(0), "Sell order does not exist");
        
        // Decrypt execution parameters
        euint32 executedAmount = FHE.decrypt(_executedAmount, inputProof);
        euint32 executedPrice = FHE.decrypt(_executedPrice, inputProof);
        
        // Validate execution parameters
        ebool amountValid = executedAmount.gt(FHE.asEuint32(0));
        ebool priceValid = executedPrice.gt(FHE.asEuint32(0));
        ebool bothValid = amountValid.and(priceValid);
        
        require(FHE.decrypt(bothValid), "Execution amount and price must be positive");
        
        uint256 executionId = executionCounter++;
        
        executions[executionId] = TradeExecution({
            executionId: FHE.asEuint32(0),
            buyOrderId: FHE.asEuint32(_buyOrderId),
            sellOrderId: FHE.asEuint32(_sellOrderId),
            executedAmount: executedAmount,
            executedPrice: executedPrice,
            buyer: orders[_buyOrderId].trader,
            seller: orders[_sellOrderId].trader,
            timestamp: block.timestamp
        });
        
        // Update order status (simplified - in real implementation, would need FHE operations)
        orders[_buyOrderId].isActive = FHE.asEbool(false);
        orders[_sellOrderId].isActive = FHE.asEbool(false);
        
        // Update portfolios
        _updatePortfolio(orders[_buyOrderId].trader, executedAmount, executedPrice, true);
        _updatePortfolio(orders[_sellOrderId].trader, executedAmount, executedPrice, false);
        
        emit OrderExecuted(executionId, _buyOrderId, _sellOrderId);
        return executionId;
    }
    
    function cancelOrder(uint256 _orderId) public {
        require(orders[_orderId].trader == msg.sender, "Not order owner");
        require(FHE.decrypt(orders[_orderId].isActive), "Order is not active");
        
        orders[_orderId].isActive = FHE.asEbool(false);
        
        emit OrderCancelled(_orderId, msg.sender);
    }
    
    function updatePortfolio(
        externalEuint32 _totalValue,
        externalEuint32 _availableBalance,
        externalEuint32 _lockedBalance,
        bytes calldata inputProof
    ) public {
        euint32 totalValue = FHE.decrypt(_totalValue, inputProof);
        euint32 availableBalance = FHE.decrypt(_availableBalance, inputProof);
        euint32 lockedBalance = FHE.decrypt(_lockedBalance, inputProof);
        
        portfolios[msg.sender] = Portfolio({
            totalValue: totalValue,
            availableBalance: availableBalance,
            lockedBalance: lockedBalance,
            totalTrades: FHE.asEuint32(0), // Would be updated through other functions
            successfulTrades: FHE.asEuint32(0)
        });
        
        emit PortfolioUpdated(msg.sender, 0); // Simplified for event emission
    }
    
    function updateReputation(
        address _trader,
        externalEuint32 _reputation,
        bytes calldata inputProof
    ) public {
        require(msg.sender == owner, "Only owner can update reputation");
        
        euint32 reputation = FHE.decrypt(_reputation, inputProof);
        traderReputation[_trader] = reputation;
        
        emit ReputationUpdated(_trader, 0); // Simplified for event emission
    }
    
    function _updatePortfolio(
        address _trader,
        euint32 _amount,
        euint32 _price,
        bool _isBuy
    ) internal {
        // This is a simplified version - in reality would need complex FHE operations
        // to update encrypted portfolio values
        Portfolio storage portfolio = portfolios[_trader];
        
        // Update total trades count
        portfolio.totalTrades = portfolio.totalTrades.add(FHE.asEuint32(1));
        
        // Update successful trades
        portfolio.successfulTrades = portfolio.successfulTrades.add(FHE.asEuint32(1));
    }
    
    function getOrder(uint256 _orderId) public view returns (
        address trader,
        string memory symbol,
        uint8 orderType,
        bool isActive,
        uint256 timestamp
    ) {
        TradeOrder storage order = orders[_orderId];
        return (
            order.trader,
            order.symbol,
            FHE.decrypt(order.orderType),
            FHE.decrypt(order.isActive),
            order.timestamp
        );
    }
    
    function getExecution(uint256 _executionId) public view returns (
        address buyer,
        address seller,
        uint256 timestamp
    ) {
        TradeExecution storage execution = executions[_executionId];
        return (
            execution.buyer,
            execution.seller,
            execution.timestamp
        );
    }
    
    function setTradingFee(uint256 _newFee) public {
        require(msg.sender == owner, "Only owner can set fee");
        require(_newFee <= 1000, "Fee cannot exceed 10%");
        tradingFee = _newFee;
    }
    
    function setFeeCollector(address _newCollector) public {
        require(msg.sender == owner, "Only owner can set fee collector");
        require(_newCollector != address(0), "Invalid fee collector address");
        feeCollector = _newCollector;
    }
}
