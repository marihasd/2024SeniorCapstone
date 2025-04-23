USE InventoryManagementSystem;

-- Drop tables in the correct order to avoid foreign key conflicts
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Purchase_Shipping;
DROP TABLE IF EXISTS StockTracking;
DROP TABLE IF EXISTS Sale;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS ProductDescription;
DROP TABLE IF EXISTS Bin;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Floor;
DROP TABLE IF EXISTS Building;
DROP TABLE IF EXISTS Batch;
DROP TABLE IF EXISTS Purchase;
DROP TABLE IF EXISTS Supplier;
DROP TABLE IF EXISTS Shipping;
DROP TABLE IF EXISTS ProductType;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Permissions;
DROP TABLE IF EXISTS AuditLog;
DROP TABLE IF EXISTS Notifications;

SET FOREIGN_KEY_CHECKS = 1;

-- Now we create the tables

-- ProductType table defines different types or categories of products
CREATE TABLE ProductType (
  ProductTypeID INT PRIMARY KEY AUTO_INCREMENT,
  ProductName VARCHAR(255) NOT NULL,
  Category VARCHAR(255) NOT NULL,
  Weight DECIMAL(10, 2) NOT NULL,
  Size VARCHAR(255),
  Material VARCHAR(255),
  Secured BOOLEAN NOT NULL,
  Refrigerated BOOLEAN NOT NULL,
  Hazardous BOOLEAN NOT NULL,
  MinimumDesiredQuantity INT, -- Should this be nullable?
  MaxCapacityInBin INT,  -- Should this be nullable?
  ProductStatus ENUM('Active', 'Inactive', 'Discontinued')  NOT NULL
);

-- Supplier table tracks vendors or suppliers of products
CREATE TABLE Supplier (
  SupplierID INT PRIMARY KEY AUTO_INCREMENT,
  SupplierName VARCHAR(255) NOT NULL,
  ContactPhone VARCHAR(255) NOT NULL,
  ContactEmail VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  PaymentTerms VARCHAR(255),
  LeadTime INT NOT NULL,
  PreferredSupplier BOOLEAN, -- Can be nullable (new suppliers)
  SupplierRating DECIMAL(10, 2) -- Can be nullable (new suppliers)
);

-- Shipping table tracks information about product shipping and delivery
CREATE TABLE Shipping (
  ShippingID INT PRIMARY KEY AUTO_INCREMENT,
  ShippingMethod VARCHAR(255) NOT NULL,
  ShippingCost DECIMAL(10, 2) NOT NULL,
  TrackingNumber VARCHAR(255) NOT NULL,
  Carrier VARCHAR(255) NOT NULL
);

-- Purchase table tracks product purchases from suppliers
CREATE TABLE Purchase (
  PurchaseID INT PRIMARY KEY AUTO_INCREMENT,
  PurchaseNumber VARCHAR(255) NOT NULL,
  SupplierID INT NOT NULL,
  ProductTypeID INT NOT NULL,
  QuantityPurchased INT NOT NULL,
  PurchasePrice DECIMAL(10, 2) NOT NULL,
  DateOrdered DATE NOT NULL,
  EstimatedDeliveryDate DATE NOT NULL,
  FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID),
  FOREIGN KEY (ProductTypeID) REFERENCES ProductType(ProductTypeID)
);

-- Purchase_Shipping join table for M:N relationship between Purchase and Shipping
CREATE TABLE Purchase_Shipping (
  Purchase_ShippingID INT PRIMARY KEY AUTO_INCREMENT,
  PurchaseID INT NOT NULL,
  ShippingID INT NOT NULL,
  QuantityShipped INT,
  ActualDeliveryDate DATE,
  FOREIGN KEY (PurchaseID) REFERENCES Purchase(PurchaseID),
  FOREIGN KEY (ShippingID) REFERENCES Shipping(ShippingID)
);

-- Batch table tracks batches of products, useful for perishable items
CREATE TABLE Batch (
  BatchID INT PRIMARY KEY AUTO_INCREMENT,
  Purchase_ShippingID INT,
  BatchNumber VARCHAR(255),
  ProductionDate DATE, -- Can be nullable? (Input these upon delivery for example)
  ExpirationDate DATE, -- Can be nullable? (Input these upon delivery for example)
  QuantityPerBatch INT, -- Can be nullable? (Input these upon delivery for example)
  FOREIGN KEY (Purchase_ShippingID) REFERENCES Purchase_Shipping(Purchase_ShippingID)
);

-- Building table stores buildings that contain locations
CREATE TABLE Building (
  BuildingID INT PRIMARY KEY AUTO_INCREMENT,
  BuildingName VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  Status ENUM('Active', 'Inactive') NOT NULL
);

-- Floor table stores floors within buildings
CREATE TABLE Floor (
  FloorID INT PRIMARY KEY AUTO_INCREMENT,
  BuildingID INT NOT NULL,
  FloorNumber VARCHAR(255) NOT NULL,
  Status ENUM('Active', 'Inactive') NOT NULL,
  FOREIGN KEY (BuildingID) REFERENCES Building(BuildingID)
);

-- Location table stores information about various locations (e.g., warehouses)
CREATE TABLE Location (
  LocationID INT PRIMARY KEY AUTO_INCREMENT,
  LocationName VARCHAR(255), -- Can be nullable (Unnamed Location of a specific type, upon site setup)
  LocationType VARCHAR(255),
  FloorID INT NOT NULL,
  Status ENUM('Active', 'Inactive'),
  FOREIGN KEY (FloorID) REFERENCES Floor(FloorID)
);

-- Bin table stores information about bins within each location, with capacity tracking
CREATE TABLE Bin (
  BinID INT PRIMARY KEY AUTO_INCREMENT,
  LocationID INT, -- Can be nullable (functional bins without locations like NULL bin) Should probably still check for these on backend
  ProductTypeID INT, -- Can be nullable (every product type has a bin to go to, but not every bin has a product type yet) Should probably still check for these on backend
  BinName VARCHAR(255) NOT NULL,
  CurrentCapacity INT NOT NULL,
  FOREIGN KEY (LocationID) REFERENCES Location(LocationID),
  FOREIGN KEY (ProductTypeID) REFERENCES ProductType(ProductTypeID)
);

-- Product table stores basic product details
CREATE TABLE Product (
  ProductID INT PRIMARY KEY AUTO_INCREMENT,
  ProductTypeID INT NOT NULL,
  BatchID INT NOT NULL,
  CurrentBinID INT NOT NULL,
  FOREIGN KEY (ProductTypeID) REFERENCES ProductType(ProductTypeID),
  FOREIGN KEY (BatchID) REFERENCES Batch(BatchID),
  FOREIGN KEY (CurrentBinID) REFERENCES Bin(BinID)
);

-- Separate table for product descriptions
CREATE TABLE ProductDescription (
  ProductTypeID INT PRIMARY KEY,
  Description TEXT NOT NULL,
  FOREIGN KEY (ProductTypeID) REFERENCES ProductType(ProductTypeID)
);

-- Sales table tracks product sales
CREATE TABLE Sale (
  SaleID INT PRIMARY KEY AUTO_INCREMENT,
  SaleNumber INT NOT NULL,
  ProductID INT NOT NULL,
  SalePrice DECIMAL(10, 2) NOT NULL,
  DateSold DATE NOT NULL,
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- StockTracking table tracks inventory movements between bins and locations
CREATE TABLE StockTracking (
  StockTrackingID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  BinFromID INT NOT NULL,
  BinToID INT NOT NULL,
  DateMoved DATE NOT NULL,
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
  FOREIGN KEY (BinFromID) REFERENCES Bin(BinID),
  FOREIGN KEY (BinToID) REFERENCES Bin(BinID)
);
