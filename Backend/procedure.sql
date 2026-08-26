USE SilverHouse;
GO

-- 1. DROP EXISTING PROCEDURES
IF OBJECT_ID('dbo.SP_GETDATA', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_GETDATA;
IF OBJECT_ID('dbo.SP_product', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_product;
IF OBJECT_ID('dbo.SP_category', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_category;
IF OBJECT_ID('dbo.SP_image', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_image;
IF OBJECT_ID('dbo.SP_make_master', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_make_master;
IF OBJECT_ID('dbo.SP_product_image', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_product_image;
GO

-- =========================================================================
-- PROCEDURE 1: SP_product
-- =========================================================================
USE SilverHouse;
GO

CREATE OR ALTER PROCEDURE dbo.SP_product
    @Opr       NVARCHAR(10),
    @JSONstr   NVARCHAR(MAX) = NULL,
    @Condition NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TargetId INT = TRY_CAST(@Condition AS INT);
    DECLARE @NewProductId INT;
    
    DECLARE @CategoryId INT;
    DECLARE @MakeId INT;
    DECLARE @Purity VARCHAR(30);
    DECLARE @Weight VARCHAR(30);
    DECLARE @Title VARCHAR(50);
    DECLARE @Description VARCHAR(200);
    DECLARE @Price DECIMAL(18,2);
    DECLARE @Discount DECIMAL(4,2);
    DECLARE @Quantity INT;
    DECLARE @IdealFor VARCHAR(15);
    DECLARE @Packaging VARCHAR(50);
    DECLARE @LabourCost DECIMAL(18,2);
    DECLARE @ActualCost DECIMAL(18,2);

    -- Extract JSON fields
    IF @JSONstr IS NOT NULL AND ISJSON(@JSONstr) > 0
    BEGIN
        SELECT
            @CategoryId  = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.category_id') AS INT),
            @MakeId      = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.m_id') AS INT),
            @Purity      = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.purity'))),
            @Weight      = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.weight'))),
            @Title       = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.title'))),
            @Description = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.description'))),
            @Price       = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.price') AS DECIMAL(18,2)),
            @Discount    = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.discount') AS DECIMAL(4,2)),
            @Quantity    = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.quantity') AS INT),
            @IdealFor    = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.ideal_for'))),
            @Packaging   = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.packaging'))),
            @LabourCost  = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.labour_cost') AS DECIMAL(18,2)),
            @ActualCost  = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.actual_cost') AS DECIMAL(18,2));

        IF @Title IS NULL OR @Title = ''
            SET @Title = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.name')));
    END

    -- Existence Check for EDIT / DELETE
    IF @Opr IN ('EDIT', 'DELETE')
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM dbo.product WHERE product_id = @TargetId)
        BEGIN
            RAISERROR('Not Found: Product with ID %d does not exist.', 16, 1, @TargetId);
            RETURN;
        END
    END

    -- SELECT
    IF @Opr = 'SELECT'
    BEGIN
        IF @TargetId IS NOT NULL AND @TargetId > 0
            SELECT * FROM dbo.product WHERE product_id = @TargetId;
        ELSE
            SELECT * FROM dbo.product;
    END

    -- ADD
    ELSE IF @Opr = 'ADD'
    BEGIN
        IF @CategoryId IS NULL
        BEGIN
            RAISERROR('Validation Error: category_id is required.', 16, 1);
            RETURN;
        END
        IF NOT EXISTS (SELECT 1 FROM dbo.category WHERE category_id = @CategoryId)
        BEGIN
            RAISERROR('Validation Error: CategoryId %d does not exist in dbo.category.', 16, 1, @CategoryId);
            RETURN;
        END
        IF @MakeId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.make_master WHERE m_id = @MakeId)
        BEGIN
            RAISERROR('Validation Error: m_id %d does not exist in dbo.make_master.', 16, 1, @MakeId);
            RETURN;
        END
        IF @Purity IS NULL OR LEN(@Purity) = 0
        BEGIN
            RAISERROR('Validation Error: purity cannot be blank.', 16, 1);
            RETURN;
        END
        IF @Weight IS NULL OR LEN(@Weight) = 0
        BEGIN
            RAISERROR('Validation Error: weight cannot be blank.', 16, 1);
            RETURN;
        END
        IF @Title IS NULL OR LEN(@Title) = 0
        BEGIN
            RAISERROR('Validation Error: title cannot be blank.', 16, 1);
            RETURN;
        END
        IF @Description IS NULL OR LEN(@Description) = 0
        BEGIN
            RAISERROR('Validation Error: description cannot be blank.', 16, 1);
            RETURN;
        END
        IF @Price IS NULL OR @Price < 0
        BEGIN
            RAISERROR('Validation Error: price must be a valid non-negative number.', 16, 1);
            RETURN;
        END
        IF @Quantity IS NULL OR @Quantity < 0
        BEGIN
            RAISERROR('Validation Error: quantity must be a non-negative integer.', 16, 1);
            RETURN;
        END
        IF @IdealFor IS NULL OR LEN(@IdealFor) = 0
        BEGIN
            RAISERROR('Validation Error: ideal_for cannot be blank.', 16, 1);
            RETURN;
        END
        IF @ActualCost IS NULL OR @ActualCost < 0
        BEGIN
            RAISERROR('Validation Error: actual_cost must be a valid non-negative number.', 16, 1);
            RETURN;
        END

        SELECT @NewProductId = ISNULL(MAX(product_id), 0) + 1 FROM dbo.product;

        INSERT INTO dbo.product (
            product_id, category_id, m_id, purity, [weight], 
            title, [description], price, discount, quantity, 
            ideal_for, packaging, labour_cost, actual_cost
        )
        VALUES (
            @NewProductId, @CategoryId, @MakeId, @Purity, @Weight,
            @Title, @Description, @Price, @Discount, @Quantity,
            @IdealFor, @Packaging, @LabourCost, @ActualCost
        );

        SELECT @NewProductId AS NewProductId, 'Product added successfully' AS [Message];
    END

    -- EDIT
    ELSE IF @Opr = 'EDIT'
    BEGIN
        IF @CategoryId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.category WHERE category_id = @CategoryId)
        BEGIN
            RAISERROR('Validation Error: CategoryId %d does not exist in dbo.category.', 16, 1, @CategoryId);
            RETURN;
        END
        IF @MakeId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM dbo.make_master WHERE m_id = @MakeId)
        BEGIN
            RAISERROR('Validation Error: m_id %d does not exist in dbo.make_master.', 16, 1, @MakeId);
            RETURN;
        END

        UPDATE dbo.product
        SET category_id  = ISNULL(@CategoryId, category_id),
            m_id         = CASE WHEN @MakeId IS NOT NULL THEN @MakeId ELSE m_id END,
            purity       = ISNULL(@Purity, purity),
            [weight]     = ISNULL(@Weight, [weight]),
            title        = ISNULL(@Title, title),
            [description]= ISNULL(@Description, [description]),
            price        = ISNULL(@Price, price),
            discount     = CASE WHEN @Discount IS NOT NULL THEN @Discount ELSE discount END,
            quantity     = ISNULL(@Quantity, quantity),
            ideal_for    = ISNULL(@IdealFor, ideal_for),
            packaging    = CASE WHEN @Packaging IS NOT NULL THEN @Packaging ELSE packaging END,
            labour_cost  = CASE WHEN @LabourCost IS NOT NULL THEN @LabourCost ELSE labour_cost END,
            actual_cost  = ISNULL(@ActualCost, actual_cost)
        WHERE product_id = @TargetId;

        SELECT @TargetId AS ProductId, 'Product updated successfully' AS [Message];
    END

    -- DELETE (Cascading delete of linked relationships)
    ELSE IF @Opr = 'DELETE'
    BEGIN
        BEGIN TRANSACTION;
        BEGIN TRY
            -- 1. Delete mapping links in junction table
            DELETE FROM dbo.product_image WHERE product_id = @TargetId;

            -- 2. Delete the actual product
            DELETE FROM dbo.product WHERE product_id = @TargetId;

            COMMIT TRANSACTION;
            SELECT @TargetId AS ProductId, 'Product and its linked records deleted successfully' AS [Message];
        END TRY
        BEGIN CATCH
            IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
            THROW;
        END CATCH
    END
END;
GO
-- =========================================================================
-- PROCEDURE 2: SP_category
-- =========================================================================
CREATE PROCEDURE dbo.SP_category
    @Opr       NVARCHAR(10),
    @JSONstr   NVARCHAR(MAX) = NULL,
    @Condition NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TargetId INT = TRY_CAST(@Condition AS INT);
    DECLARE @NewCategoryId INT;
    DECLARE @Name VARCHAR(50);
    DECLARE @Description VARCHAR(100);
    DECLARE @Slug VARCHAR(50);
    DECLARE @IdealFor VARCHAR(20);

    -- Extract JSON fields
    IF @JSONstr IS NOT NULL AND ISJSON(@JSONstr) > 0
    BEGIN
        SELECT
            @Name        = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.name'))),
            @Description = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.description'))),
            @Slug        = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.slug'))),
            @IdealFor    = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.ideal_for')));
    END

    -- Existence Check for EDIT / DELETE
    IF @Opr IN ('EDIT', 'DELETE')
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM dbo.category WHERE category_id = @TargetId)
        BEGIN
            RAISERROR('Not Found: Category with ID %d does not exist.', 16, 1, @TargetId);
            RETURN;
        END
    END

    -- CRUD ROUTING
    IF @Opr = 'SELECT'
    BEGIN
        IF @TargetId IS NOT NULL AND @TargetId > 0
            SELECT category_id, [name], [description], slug, ideal_for 
            FROM dbo.category 
            WHERE category_id = @TargetId;
        ELSE
            SELECT category_id, [name], [description], slug, ideal_for 
            FROM dbo.category;
    END

    ELSE IF @Opr = 'ADD'
    BEGIN
        IF @Name IS NULL OR LEN(@Name) = 0
        BEGIN
            RAISERROR('Validation Error: name cannot be blank.', 16, 1);
            RETURN;
        END
        IF @Description IS NULL OR LEN(@Description) = 0
        BEGIN
            RAISERROR('Validation Error: description cannot be blank.', 16, 1);
            RETURN;
        END
        IF @Slug IS NULL OR LEN(@Slug) = 0
        BEGIN
            RAISERROR('Validation Error: slug cannot be blank.', 16, 1);
            RETURN;
        END

        IF EXISTS (SELECT 1 FROM dbo.category WHERE [name] = @Name OR slug = @Slug)
        BEGIN
            RAISERROR('Validation Error: Category name or slug already exists.', 16, 1);
            RETURN;
        END

        SELECT @NewCategoryId = ISNULL(MAX(category_id), 0) + 1 FROM dbo.category;

        INSERT INTO dbo.category (category_id, [name], [description], slug, ideal_for)
        VALUES (@NewCategoryId, @Name, @Description, @Slug, @IdealFor);

        SELECT @NewCategoryId AS NewCategoryId, 'Category added successfully' AS [Message];
    END

    ELSE IF @Opr = 'EDIT'
    BEGIN
        IF @Name IS NOT NULL AND EXISTS (SELECT 1 FROM dbo.category WHERE [name] = @Name AND category_id <> @TargetId)
        BEGIN
            RAISERROR('Validation Error: Category name "%s" is already taken.', 16, 1, @Name);
            RETURN;
        END
        IF @Slug IS NOT NULL AND EXISTS (SELECT 1 FROM dbo.category WHERE slug = @Slug AND category_id <> @TargetId)
        BEGIN
            RAISERROR('Validation Error: Category slug "%s" is already taken.', 16, 1, @Slug);
            RETURN;
        END

        UPDATE dbo.category
        SET [name]        = ISNULL(@Name, [name]),
            [description] = ISNULL(@Description, [description]),
            slug          = ISNULL(@Slug, slug),
            ideal_for     = CASE WHEN @IdealFor IS NOT NULL THEN @IdealFor ELSE ideal_for END
        WHERE category_id = @TargetId;

        SELECT @TargetId AS CategoryId, 'Category updated successfully' AS [Message];
    END

    ELSE IF @Opr = 'DELETE'
    BEGIN
        IF EXISTS (SELECT 1 FROM dbo.product WHERE category_id = @TargetId)
        BEGIN
            RAISERROR('Constraint Error: Cannot delete category because products are assigned to it.', 16, 1);
            RETURN;
        END

        DELETE FROM dbo.category WHERE category_id = @TargetId;
        SELECT @TargetId AS CategoryId, 'Category deleted successfully' AS [Message];
    END
END;
GO

-- =========================================================================
-- PROCEDURE 3: SP_image
-- =========================================================================
CREATE PROCEDURE dbo.SP_image
    @Opr       NVARCHAR(10),
    @JSONstr   NVARCHAR(MAX) = NULL,
    @Condition NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TargetId INT = TRY_CAST(@Condition AS INT);
    DECLARE @ImageUrl VARCHAR(500);
    DECLARE @NewImageId INT;

    -- Extract JSON fields
    IF @JSONstr IS NOT NULL AND ISJSON(@JSONstr) > 0
    BEGIN
        SELECT
            @ImageUrl = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.image_url')));
    END

    -- Existence Check for EDIT / DELETE
    IF @Opr IN ('EDIT', 'DELETE')
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM dbo.[image] WHERE image_id = @TargetId)
        BEGIN
            RAISERROR('Not Found: Image with ID %d does not exist.', 16, 1, @TargetId);
            RETURN;
        END
    END

    -- CRUD ROUTING
    IF @Opr = 'SELECT'
    BEGIN
        IF @TargetId IS NOT NULL AND @TargetId > 0
            SELECT image_id, image_url 
            FROM dbo.[image] 
            WHERE image_id = @TargetId;
        ELSE
            SELECT image_id, image_url 
            FROM dbo.[image];
    END

    ELSE IF @Opr = 'ADD'
    BEGIN
        IF @ImageUrl IS NULL OR LEN(@ImageUrl) = 0
        BEGIN
            RAISERROR('Validation Error: image_url cannot be blank.', 16, 1);
            RETURN;
        END

        SELECT @NewImageId = ISNULL(MAX(image_id), 0) + 1 FROM dbo.[image];

        INSERT INTO dbo.[image] (image_id, image_url)
        VALUES (@NewImageId, @ImageUrl);

        SELECT @NewImageId AS NewImageId, 'Image added successfully' AS [Message];
    END

    ELSE IF @Opr = 'EDIT'
    BEGIN
        IF @ImageUrl IS NULL OR LEN(@ImageUrl) = 0
        BEGIN
            RAISERROR('Validation Error: image_url cannot be blank on update.', 16, 1);
            RETURN;
        END

        UPDATE dbo.[image]
        SET image_url = @ImageUrl
        WHERE image_id = @TargetId;

        SELECT @TargetId AS ImageId, 'Image updated successfully' AS [Message];
    END

    ELSE IF @Opr = 'DELETE'
    BEGIN
        IF EXISTS (SELECT 1 FROM dbo.product_image WHERE image_id = @TargetId)
        BEGIN
            RAISERROR('Constraint Error: Cannot delete image because it is linked in dbo.product_image.', 16, 1);
            RETURN;
        END

        DELETE FROM dbo.[image] WHERE image_id = @TargetId;
        SELECT @TargetId AS ImageId, 'Image deleted successfully' AS [Message];
    END
END;
GO


-- =========================================================================
-- PROCEDURE 4: SP_make_master
-- =========================================================================

USE SilverHouse;
GO

CREATE OR ALTER PROCEDURE dbo.SP_make_master
    @Opr       NVARCHAR(10),
    @JSONstr   NVARCHAR(MAX) = NULL,
    @Condition NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TargetId INT = TRY_CAST(@Condition AS INT);
    DECLARE @NewMakeId INT;
    DECLARE @Type VARCHAR(50);

    -- Extract JSON fields
    IF @JSONstr IS NOT NULL AND ISJSON(@JSONstr) > 0
    BEGIN
        SELECT
            @Type = LTRIM(RTRIM(JSON_VALUE(@JSONstr, '$.table_values.type')));
    END

    -- Existence Check for EDIT / DELETE
    IF @Opr IN ('EDIT', 'DELETE')
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM dbo.make_master WHERE m_id = @TargetId)
        BEGIN
            RAISERROR('Not Found: Make entry with ID %d does not exist.', 16, 1, @TargetId);
            RETURN;
        END
    END

    -- SELECT
    IF @Opr = 'SELECT'
    BEGIN
        IF @TargetId IS NOT NULL AND @TargetId > 0
            SELECT m_id, [type] FROM dbo.make_master WHERE m_id = @TargetId;
        ELSE
            SELECT m_id, [type] FROM dbo.make_master;
    END

    -- ADD
    ELSE IF @Opr = 'ADD'
    BEGIN
        IF @Type IS NULL OR LEN(@Type) = 0
        BEGIN
            RAISERROR('Validation Error: type cannot be blank.', 16, 1);
            RETURN;
        END

        IF EXISTS (SELECT 1 FROM dbo.make_master WHERE [type] = @Type)
        BEGIN
            RAISERROR('Validation Error: Type "%s" already exists in make_master.', 16, 1, @Type);
            RETURN;
        END

        SELECT @NewMakeId = ISNULL(MAX(m_id), 0) + 1 FROM dbo.make_master;

        INSERT INTO dbo.make_master (m_id, [type])
        VALUES (@NewMakeId, @Type);

        SELECT @NewMakeId AS NewMakeId, 'Make entry added successfully' AS [Message];
    END

    -- EDIT
    ELSE IF @Opr = 'EDIT'
    BEGIN
        IF @Type IS NULL OR LEN(@Type) = 0
        BEGIN
            RAISERROR('Validation Error: type cannot be blank on update.', 16, 1);
            RETURN;
        END

        IF EXISTS (SELECT 1 FROM dbo.make_master WHERE [type] = @Type AND m_id <> @TargetId)
        BEGIN
            RAISERROR('Validation Error: Type "%s" already exists.', 16, 1, @Type);
            RETURN;
        END

        UPDATE dbo.make_master
        SET [type] = @Type
        WHERE m_id = @TargetId;

        SELECT @TargetId AS MakeId, 'Make entry updated successfully' AS [Message];
    END

    -- DELETE
    ELSE IF @Opr = 'DELETE'
    BEGIN
        IF EXISTS (SELECT 1 FROM dbo.product WHERE m_id = @TargetId)
        BEGIN
            RAISERROR('Constraint Error: Cannot delete make entry because products reference it.', 16, 1);
            RETURN;
        END

        DELETE FROM dbo.make_master WHERE m_id = @TargetId;
        SELECT @TargetId AS MakeId, 'Make entry deleted successfully' AS [Message];
    END
END;
GO


-- =========================================================================
-- PROCEDURE 5: SP_product_image
-- =========================================================================
USE SilverHouse;
GO

CREATE OR ALTER PROCEDURE dbo.SP_product_image
    @Opr       NVARCHAR(10),
    @JSONstr   NVARCHAR(MAX) = NULL,
    @Condition NVARCHAR(MAX) = NULL -- Can be product_id for filtering
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TargetProductId INT = TRY_CAST(@Condition AS INT);
    DECLARE @ProductId INT;
    DECLARE @ImageId INT;

    -- Extract JSON fields
    IF @JSONstr IS NOT NULL AND ISJSON(@JSONstr) > 0
    BEGIN
        SELECT
            @ProductId = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.product_id') AS INT),
            @ImageId   = TRY_CAST(JSON_VALUE(@JSONstr, '$.table_values.image_id') AS INT);
    END

    -- If condition was passed, use it as fallback for ProductId
    IF @ProductId IS NULL AND @TargetProductId IS NOT NULL
        SET @ProductId = @TargetProductId;

    -- SELECT
    IF @Opr = 'SELECT'
    BEGIN
        IF @TargetProductId IS NOT NULL AND @TargetProductId > 0
        BEGIN
            SELECT 
                pi.product_id,
                p.title AS product_name,
                pi.image_id,
                img.image_url
            FROM dbo.product_image pi
            INNER JOIN dbo.product p ON pi.product_id = p.product_id
            INNER JOIN dbo.[image] img ON pi.image_id = img.image_id
            WHERE pi.product_id = @TargetProductId;
        END
        ELSE
        BEGIN
            SELECT 
                pi.product_id,
                p.title AS product_name,
                pi.image_id,
                img.image_url
            FROM dbo.product_image pi
            INNER JOIN dbo.product p ON pi.product_id = p.product_id
            INNER JOIN dbo.[image] img ON pi.image_id = img.image_id;
        END
    END

    -- ADD
    ELSE IF @Opr = 'ADD'
    BEGIN
        IF @ProductId IS NULL OR @ProductId <= 0
        BEGIN
            RAISERROR('Validation Error: A valid product_id is required.', 16, 1);
            RETURN;
        END

        IF @ImageId IS NULL OR @ImageId <= 0
        BEGIN
            RAISERROR('Validation Error: A valid image_id is required.', 16, 1);
            RETURN;
        END

        -- FK Validation
        IF NOT EXISTS (SELECT 1 FROM dbo.product WHERE product_id = @ProductId)
        BEGIN
            RAISERROR('Validation Error: Product ID %d does not exist.', 16, 1, @ProductId);
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM dbo.[image] WHERE image_id = @ImageId)
        BEGIN
            RAISERROR('Validation Error: Image ID %d does not exist.', 16, 1, @ImageId);
            RETURN;
        END

        -- Composite PK Duplicate Check
        IF EXISTS (SELECT 1 FROM dbo.product_image WHERE product_id = @ProductId AND image_id = @ImageId)
        BEGIN
            RAISERROR('Validation Error: This image is already mapped to the specified product.', 16, 1);
            RETURN;
        END

        INSERT INTO dbo.product_image (product_id, image_id)
        VALUES (@ProductId, @ImageId);

        SELECT @ProductId AS ProductId, @ImageId AS ImageId, 'Product image mapped successfully' AS [Message];
    END

    -- DELETE
    ELSE IF @Opr = 'DELETE'
    BEGIN
        -- If both product_id and image_id provided, delete exact record
        IF @ProductId IS NOT NULL AND @ImageId IS NOT NULL
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM dbo.product_image WHERE product_id = @ProductId AND image_id = @ImageId)
            BEGIN
                RAISERROR('Not Found: Mapping for Product ID %d and Image ID %d does not exist.', 16, 1, @ProductId, @ImageId);
                RETURN;
            END

            DELETE FROM dbo.product_image WHERE product_id = @ProductId AND image_id = @ImageId;
            SELECT @ProductId AS ProductId, @ImageId AS ImageId, 'Mapping removed successfully' AS [Message];
        END
        -- If only product_id is provided via Condition, remove all images linked to that product
        ELSE IF @TargetProductId IS NOT NULL
        BEGIN
            DELETE FROM dbo.product_image WHERE product_id = @TargetProductId;
            SELECT @TargetProductId AS ProductId, 'All images unmapped for product' AS [Message];
        END
        ELSE
        BEGIN
            RAISERROR('Validation Error: product_id and image_id are required for delete.', 16, 1);
            RETURN;
        END
    END
    ELSE
    BEGIN
        RAISERROR('Validation Error: Operation "%s" is not supported for product_image.', 16, 1, @Opr);
        RETURN;
    END
END;
GO

-- =========================================================================
-- PROCEDURE 6: SP_GETDATA 
-- =========================================================================
USE SilverHouse;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GETDATA
    @proc_name   NVARCHAR(50),
    @Opr         NVARCHAR(10),
    @JSONstr     NVARCHAR(MAX) = NULL,
    @Condition   NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Response NVARCHAR(MAX) = 'OK';

    SET @proc_name = LOWER(LTRIM(RTRIM(@proc_name)));
    SET @Opr = UPPER(LTRIM(RTRIM(@Opr)));

    -- 1. Table/Procedure Name Validation
    IF @proc_name IS NULL OR @proc_name = ''
    BEGIN
        SET @Response = 'ERROR: proc_name cannot be empty.';
        SELECT @Response AS [Response_Status];
        RETURN;
    END

    -- Whitelist including new tables
    IF @proc_name NOT IN ('product', 'category', 'image', 'make_master', 'product_image')
    BEGIN
        SET @Response = 'SECURITY ERROR: Unauthorized or unsupported proc_name "' + @proc_name + '".';
        SELECT @Response AS [Response_Status];
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @proc_name)
    BEGIN
        SET @Response = 'DATABASE ERROR: Target table "' + @proc_name + '" does not exist in schema.';
        SELECT @Response AS [Response_Status];
        RETURN;
    END

    -- 2. Operation Validation
    IF @Opr NOT IN ('ADD', 'EDIT', 'DELETE', 'SELECT')
    BEGIN
        SET @Response = 'VALIDATION ERROR: Invalid operation "' + @Opr + '". Allowed: ADD, EDIT, DELETE, SELECT.';
        SELECT @Response AS [Response_Status];
        RETURN;
    END

    -- 3. JSON Payload Validation (Required for ADD)
    IF @Opr = 'ADD'
    BEGIN
        IF @JSONstr IS NULL OR ISJSON(@JSONstr) = 0
        BEGIN
            SET @Response = 'VALIDATION ERROR: A valid JSON payload (JSONstr) is required for ADD operations.';
            SELECT @Response AS [Response_Status];
            RETURN;
        END
    END

    -- 4. Execution with TRY...CATCH
    BEGIN TRY
        IF @proc_name = 'product'
            EXEC dbo.SP_product @Opr = @Opr, @JSONstr = @JSONstr, @Condition = @Condition;
        ELSE IF @proc_name = 'category'
            EXEC dbo.SP_category @Opr = @Opr, @JSONstr = @JSONstr, @Condition = @Condition;
        ELSE IF @proc_name = 'image'
            EXEC dbo.SP_image @Opr = @Opr, @JSONstr = @JSONstr, @Condition = @Condition;
        ELSE IF @proc_name = 'make_master'
            EXEC dbo.SP_make_master @Opr = @Opr, @JSONstr = @JSONstr, @Condition = @Condition;
        ELSE IF @proc_name = 'product_image'
            EXEC dbo.SP_product_image @Opr = @Opr, @JSONstr = @JSONstr, @Condition = @Condition;

        SET @Response = 'OK';
        SELECT @Response AS [Response_Status];
    END TRY
    BEGIN CATCH
        SET @Response = 'ERROR [' + CAST(ERROR_NUMBER() AS NVARCHAR(10)) + ']: ' + ERROR_MESSAGE();
        SELECT @Response AS [Response_Status];
    END CATCH
END;
GO