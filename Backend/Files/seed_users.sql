USE SilverHouse;
GO

-- 1. Create dbo.[user] table if it does not exist
IF OBJECT_ID('dbo.[user]', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.[user] (
        user_id INT IDENTITY(1,1) PRIMARY KEY,
        full_name NVARCHAR(100) NOT NULL,
        email NVARCHAR(150) NOT NULL UNIQUE,
        phone NVARCHAR(20) NULL,
        password_hash NVARCHAR(255) NOT NULL,
        [role] NVARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
    PRINT 'Created table dbo.[user]';
END;
GO

-- 2. Seed Default Admin User (admin@silverhouse.com / Admin@123)
IF NOT EXISTS (SELECT 1 FROM dbo.[user] WHERE email = 'admin@silverhouse.com')
BEGIN
    INSERT INTO dbo.[user] (full_name, email, phone, password_hash, [role])
    VALUES ('SilverHouse Admin', 'admin@silverhouse.com', '+919876543210', 'Admin@123', 'ADMIN');
    PRINT 'Seeded default Admin user: admin@silverhouse.com';
END
ELSE
BEGIN
    UPDATE dbo.[user] 
    SET [role] = 'ADMIN', password_hash = 'Admin@123' 
    WHERE email = 'admin@silverhouse.com';
    PRINT 'Updated Admin user role & password';
END;
GO

-- 3. Seed Default Customer User (customer@silverhouse.com / User@123)
IF NOT EXISTS (SELECT 1 FROM dbo.[user] WHERE email = 'customer@silverhouse.com')
BEGIN
    INSERT INTO dbo.[user] (full_name, email, phone, password_hash, [role])
    VALUES ('Isha Agarwal', 'customer@silverhouse.com', '+919123456789', 'User@123', 'CUSTOMER');
    PRINT 'Seeded default Customer user: customer@silverhouse.com';
END
ELSE
BEGIN
    UPDATE dbo.[user] 
    SET [role] = 'CUSTOMER', password_hash = 'User@123' 
    WHERE email = 'customer@silverhouse.com';
    PRINT 'Updated Customer user role & password';
END;
GO

PRINT 'User seeding script completed successfully!';
GO
