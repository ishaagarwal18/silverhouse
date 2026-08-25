USE SilverHouse;
GO

EXEC dbo.SP_GETDATA 
    @proc_name = 'category', 
    @Opr = 'ADD', 
    @JSONstr = '{"table_values": {"name": "Silver Anklets", "description": "Traditional 925 silver payal", "slug": "silver-anklets", "ideal_for": "Women"}}';

EXEC dbo.SP_GETDATA 
    @proc_name = 'category', 
    @Opr = 'SELECT';


    EXEC dbo.SP_GETDATA 
    @proc_name = 'product', 
    @Opr = 'ADD', 
    @JSONstr = '{
        "table_values": {
            "category_id": 99999,
            "title": "Invalid Ring",
            "purity": "92.5",
            "weight": "3.0 gm",
            "description": "Test description",
            "price": 999.00,
            "quantity": 10,
            "ideal_for": "Women",
            "actual_cost": 500.00
        }
    }';

EXEC dbo.SP_GETDATA 
    @proc_name = 'product', 
    @Opr = 'EDIT', 
    @JSONstr = '{"table_values": {"price": 1200.00}}',
    @Condition = NULL;