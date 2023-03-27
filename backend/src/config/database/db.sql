ALTER TABLE
  USUARIOS
MODIFY
  CONSTRAINT CHECk(LENGTH(contraseña) >= 8);

SELECT
  `OrderModel`.`ID_ORDEN` AS `id`,
  `OrderModel`.`DATE_PEDITO` AS `date`,
  `OrderModel`.`FK_PRODUCTO` AS `foodItemId`,
  `OrderModel`.`FK_QR_MESA` AS `spotQr`,
  `SpotModel`.`QR_MESA` AS `SpotModel.qr`,
  `SpotModel`.`ZONA_MESA` AS `SpotModel.placeSet`,
  `SpotModel`.`FK_ID_USER` AS `SpotModel.userId`,
  `FoodItemModel`.`ID_PROD` AS `FoodItemModel.id`,
  `FoodItemModel`.`NOM_PROD` AS `FoodItemModel.name`,
  `FoodItemModel`.`CANT_PROD` AS `FoodItemModel.quantity`,
  `FoodItemModel`.`FK_CATEGO` AS `FoodItemModel.categoryType`,
  `FoodItemModel`.`ESTADO_PROD` AS `FoodItemModel.status`,
  `FoodItemModel`.`DESCR_PROD` AS `FoodItemModel.description`,
  `FoodItemModel`.`PRECIO_PROD` AS `FoodItemModel.price`,
  `FoodItemModel`.`IMAGEN_PROD` AS `FoodItemModel.thumbnailUrl`
FROM
  `pedido` AS `OrderModel`
  LEFT OUTER JOIN `mesas` AS `SpotModel` ON `OrderModel`.`FK_QR_MESA` = `SpotModel`.`QR_MESA`
  LEFT OUTER JOIN `producto` AS `FoodItemModel` ON `OrderModel`.`FK_PRODUCTO` = `FoodItemModel`.`ID_PROD`
WHERE
  `OrderModel`.`DATE_PEDITO` IN (NULL);

Executing (default):
SELECT
  `OrderModel`.`ID_ORDEN` AS `id`,
  `OrderModel`.`DATE_PEDITO` AS `date`,
  `OrderModel`.`FK_PRODUCTO` AS `foodItemId`,
  `OrderModel`.`FK_QR_MESA` AS `spotQr`,
  `SpotModel`.`QR_MESA` AS `SpotModel.qr`,
  `SpotModel`.`ZONA_MESA` AS `SpotModel.placeSet`,
  `SpotModel`.`FK_ID_USER` AS `SpotModel.userId`,
  `FoodItemModel`.`ID_PROD` AS `FoodItemModel.id`,
  `FoodItemModel`.`NOM_PROD` AS `FoodItemModel.name`,
  `FoodItemModel`.`CANT_PROD` AS `FoodItemModel.quantity`,
  `FoodItemModel`.`FK_CATEGO` AS `FoodItemModel.categoryType`,
  `FoodItemModel`.`ESTADO_PROD` AS `FoodItemModel.status`,
  `FoodItemModel`.`DESCR_PROD` AS `FoodItemModel.description`,
  `FoodItemModel`.`PRECIO_PROD` AS `FoodItemModel.price`,
  `FoodItemModel`.`IMAGEN_PROD` AS `FoodItemModel.thumbnailUrl`
FROM
  `pedido` AS `OrderModel`
  LEFT OUTER JOIN `mesas` AS `SpotModel` ON `OrderModel`.`FK_QR_MESA` = `SpotModel`.`QR_MESA`
  LEFT OUTER JOIN `producto` AS `FoodItemModel` ON `OrderModel`.`FK_PRODUCTO` = `FoodItemModel`.`ID_PROD`
WHERE
  `OrderModel`.`DATE_PEDITO` IN (NULL);