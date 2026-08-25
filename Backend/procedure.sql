USE SilverHouse;
GO

-- 1. DROP EXISTING PROCEDURES
IF OBJECT_ID('dbo.SP_GETDATA', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_GETDATA;
IF OBJECT_ID('dbo.SP_product', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_product;
IF OBJECT_ID('dbo.SP_category', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_category;
IF OBJECT_ID('dbo.SP_image', 'P') IS NOT NULL DROP PROCEDURE dbo.SP_image;
GO

-- =========================================================================
-- PROCEDURE 1: SP_product
-- =========================================================================
CREATE PROCEDURE dbo.SP_product
    @Opr       NVARCHAR(10),
    @JSONstr   NVARCHAR(MAX) = NULL,
    @Condition NVARCHAR(MAX) = NULL
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

    -- CRUD ROUTING
    IF @Opr = 'SELECT'
    BEGIN
        IF @TargetId IS NOT NULL AND @TargetId > 0
            SELECT * FROM dbo.product WHERE product_id = @TargetId;
        ELSE
            SELECT * FROM dbo.product;
    END

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

    ELSE IF @Opr = 'DELETE'
    BEGIN
        IF EXISTS (SELECT 1 FROM dbo.product_image WHERE product_id = @TargetId)
        BEGIN
            RAISERROR('Constraint Error: Cannot delete product because images are linked to it in dbo.product_image.', 16, 1);
            RETURN;
        END

        DELETE FROM dbo.product WHERE product_id = @TargetId;
        SELECT @TargetId AS ProductId, 'Product deleted successfully' AS [Message];
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
-- PROCEDURE 4: SP_GETDATA (Dispatcher with Point 5 TRY...CATCH)
-- =========================================================================
USE SilverHouse;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GETDATA
    @proc_name   NVARCHAR(50),          -- Target entity/table
    @Opr         NVARCHAR(10),          -- 'ADD', 'EDIT', 'DELETE', 'SELECT'
    @JSONstr     NVARCHAR(MAX) = NULL,  -- JSON formatted string
    @Condition   NVARCHAR(255) = NULL   -- Primary Key / ID
AS
BEGIN
    SET NOCOUNT ON;

    -- Internal response variable
    DECLARE @Response NVARCHAR(MAX) = 'OK';

    -- Normalize inputs
    SET @proc_name = LOWER(LTRIM(RTRIM(@proc_name)));
    SET @Opr = UPPER(LTRIM(RTRIM(@Opr)));

    -- 1. Procedure/Table Name Validation
    IF @proc_name IS NULL OR @proc_name = ''
    BEGIN
        SET @Response = 'ERROR: proc_name cannot be empty.';
        SELECT @Response AS [Response_Status];
        RETURN;
    END

    IF @proc_name NOT IN ('product', 'category', 'image')
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

    -- 3. JSON Payload Validation
    IF @Opr IN ('ADD', 'EDIT')
    BEGIN
        IF @JSONstr IS NULL OR ISJSON(@JSONstr) = 0
        BEGIN
            SET @Response = 'VALIDATION ERROR: A valid JSON payload (JSONstr) is required for ADD/EDIT operations.';
            SELECT @Response AS [Response_Status];
            RETURN;
        END
    END

    -- 4. Condition / ID Validation
    IF @Opr IN ('EDIT', 'DELETE')
    BEGIN
        IF @Condition IS NULL OR TRY_CAST(@Condition AS INT) IS NULL OR CAST(@Condition AS INT) <= 0
        BEGIN
            SET @Response = 'VALIDATION ERROR: A valid positive integer ID/Condition is required for ' + @Opr + ' operations.';
            SELECT @Response AS [Response_Status];
            RETURN;
        END
    END

    -- 5. Execution of Target Stored Procedure inside TRY...CATCH
    BEGIN TRY
        IF @proc_name = 'product'
            EXEC dbo.SP_product @Opr = @Opr, @JSONstr = @JSONstr, @Condition = @Condition;
        ELSE IF @proc_name = 'category'
            EXEC dbo.SP_category @Opr = @Opr, @JSONstr = @JSONstr, @Condition = @Condition;
        ELSE IF @proc_name = 'image'
            EXEC dbo.SP_image @Opr = @Opr, @JSONstr = @JSONstr, @Condition = @Condition;

        SET @Response = 'OK';
        SELECT @Response AS [Response_Status];
    END TRY
    BEGIN CATCH
        SET @Response = 'ERROR [' + CAST(ERROR_NUMBER() AS NVARCHAR(10)) + ']: ' + ERROR_MESSAGE();
        SELECT @Response AS [Response_Status];
    END CATCH
END;
GO