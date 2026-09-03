USE SilverHouse;
GO

-- =========================================================================
-- FIXED SEED SCRIPT: ADD MORE PRODUCTS TO DATABASE (IDs 309 to 320)
-- =========================================================================

-- 1. Clean up existing records for IDs 309 to 320 to allow clean re-runs
DELETE FROM dbo.product_image WHERE product_id >= 309 AND product_id <= 320;
DELETE FROM dbo.product WHERE product_id >= 309 AND product_id <= 320;
DELETE FROM dbo.[image] WHERE image_id >= 309 AND image_id <= 320;
GO

-- 2. Insert 12 New Products (IDs 309 to 320)
INSERT INTO dbo.product (
    product_id, category_id, m_id, title, purity, [weight], [description], 
    price, discount, quantity, ideal_for, packaging, labour_cost, actual_cost, [priority]
)
VALUES
(309, 5, 1, 'Radha Krishna Silver Statue 120g', '99.9 Pure', '120.00 gm', 'Exquisitely detailed 999 pure silver Radha Krishna murtis for mandir.', 18499.00, 5.00, 6, 'ALL', 'Royal Wooden Box', 2200.00, 14500.00, 95),
(310, 1, 3, 'CZ Solitaire Silver Ring', '925 Sterling', '3.80 gm', 'Elegant single stone CZ solitaire ring crafted in pure 925 sterling silver.', 1899.00, 0.00, 30, 'Women', 'Premium Ring Box', 250.00, 1200.00, 75),
(311, 1, 3, 'Peacock Motif Silver Ring', '925 Sterling', '4.50 gm', 'Handcrafted peacock design silver ring with enamel colors and adjustable band.', 2299.00, 10.00, 20, 'Women', 'Velvet Pouch', 320.00, 1500.00, 70),
(312, 3, 3, 'Temple Design Silver Bangle Set', '925 Sterling', '48.00 gm', 'Pair of traditional South Indian temple style silver bangles with antique finish.', 11499.00, 8.00, 10, 'Women', 'Hard Velvet Case', 1600.00, 8500.00, 85),
(313, 3, 3, 'Oxidised Silver Broad Chandi Kada', '925 Sterling', '32.00 gm', 'Statement tribal oxidised silver kada featuring intricate floral carving.', 7899.00, 0.00, 12, 'Women', 'Royal Box', 1100.00, 5900.00, 65),
(314, 2, 2, 'Trishul & Damru Silver Pendant', '925 Sterling', '9.50 gm', 'Sacred Lord Shiva Trishul and Damru motif pendant paired with silver chain.', 3899.00, 5.00, 25, 'ALL', 'Sleek Gift Box', 420.00, 2800.00, 90),
(315, 2, 2, 'Tree of Life Silver Pendant', '925 Sterling', '6.20 gm', 'Symbolic Tree of Life circular pendant with diamond-cut shine.', 2699.00, 0.00, 15, 'Women', 'Sleek Pouch', 300.00, 1800.00, 55),
(316, 7, 5, 'Solid Royal Silver Kada for Men', '925 Sterling', '40.00 gm', 'Classic heavy Sikh Punjabi style solid silver kada with high mirror shine.', 8999.00, 5.00, 15, 'Men', 'Leatherette Box', 900.00, 6800.00, 88),
(317, 7, 5, 'Heavy Silver Cuban Link Chain', '925 Sterling', '35.00 gm', 'Masculine 8mm thick Cuban curb link silver neck chain with lobster clasp.', 8299.00, 10.00, 10, 'Men', 'Leatherette Box', 850.00, 6100.00, 82),
(318, 4, 4, 'Heavy Antique Ghungroo Payal', '925 Sterling', '55.00 gm', 'Heavy ethnic bridal payal set with sweet chiming ghungroo bells.', 11999.00, 5.00, 8, 'Women', 'Velvet Case', 1800.00, 8900.00, 78),
(319, 8, 1, 'Silver Baby Kada with Charm Bells', '925 Sterling', '8.00 gm', 'Adjustable smooth baby silver kadas with protective evil eye beads.', 2499.00, 0.00, 22, 'Kids', 'Gift Pouch', 300.00, 1700.00, 62),
(320, 6, 5, '999 Pure Silver Lakshmi Bar 50g', '99.9 Pure', '50.00 gm', '999 fine pure silver rectangular bar embossed with Lakshmi Ganesha.', 8499.00, 0.00, 40, 'ALL', 'Blister Card', 350.00, 7400.00, 98);
GO

-- 3. Insert Product Images (IDs 309 to 320) using custom URLs
INSERT INTO dbo.[image] (image_id, image_url)
VALUES 
(309, 'https://www.lladro.com/en_in/radha-krishna-sculpture-limited-edition-en-in-01002015.html?srsltid=AfmBOordqDQYxN009cz5ibCpg4y4lePJDLAuVvKCbLp_B6abUzlIk5yi'),
(310, 'https://www.ornatejewels.com/products/silver-pink-cz-round-ring?srsltid=AfmBOopg50WrwBXftgFJsCadZbn7MZR3hsBM0SAGwVthN7cbVKu1Ou_A'),
(311, 'https://rkgshopping.in/products/silver-look-alike-finger-ring-with-stones?srsltid=AfmBOooI9m7j4TEiBVSY9QfPgXwLibWTBu6MzoSHQnZPmvbsoaGZ5So6'),
(312, 'https://www.griiham.in/products/gold-plated-set-of-6-temple-collection-bangles-copy-2?srsltid=AfmBOoqbMpO8WlmxkYVT-3WUrc5yGPuPKETmzg-C0V2ed4cM0LtWf9Ff'),
(313, 'https://nakodapayals.com/products/lion-broad-oxidised-kada-k5109'),
(314, 'https://www.ayasalley.com/products/silver-lord-shiva-trishul-pendant?srsltid=AfmBOopP0xlYGIymmy9pUrPQWUPXNCza7cXjOkLiEXQBYKkSh03gW3mW'),
(315, 'https://huntersfinejewellery.com/blogs/jewellery-symbolism-meaning/tree-of-life-necklace-meaning?srsltid=AfmBOorCNC5DMsmvuXEoc0V9rvF57trrQYXcZdU94K-KoMspPAFaea5v'),
(316, 'https://touch925.com/collections/mens-kada?srsltid=AfmBOorA7i9HheHXd8VpnBKTHdKyGDEWOWWm_HCWLme6rFms5vzcIxBB'),
(317, 'https://caratsutra.in/products/copy-of-rare-prince-by-carat-sutra-12mm-wide-solid-miami-cuban-link-chain-925-sterling-silver-chain-mens-jewelry-with-certificate-of-authenticity-and-925-hallmark-2?srsltid=AfmBOorz3F55Nvgq2KiafHfcIHchlDXfJLWqoa6gq25qCbnvnhD7Pwcl'),
(318, 'https://thebetagirl.in/products/ghughru-silner-look-alike-payal?srsltid=AfmBOookIGGFanrLSdPAsy8D9ZIZO0nJhzemRNo6sxpyz_jJ27MCFD_f'),
(319, 'https://silverlinings.in/products/silver-baby-leg-kada-bb042?srsltid=AfmBOorvwZs_gZV7j3QFikozep7QZ5hZDYKXKL55dOmW4zVfWy9cT_4l'),
(320, 'https://www.gujaratgoldcentre.com/product-detail/50gm-ggc-silver-bar?srsltid=AfmBOooLvPzXLnhkKY0pxoelfVRnKM0AS9y_3ge1k-8FrX6oHs654Cuz');
GO

-- 4. Map Product IDs to Image IDs
INSERT INTO dbo.product_image (product_id, image_id)
VALUES 
(309, 309),
(310, 310),
(311, 311),
(312, 312),
(313, 313),
(314, 314),
(315, 315),
(316, 316),
(317, 317),
(318, 318),
(319, 319),
(320, 320);
GO

PRINT 'Successfully inserted 12 new products into SilverHouse database!';
GO
