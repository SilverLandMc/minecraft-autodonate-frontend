/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorMessageResponse {
    /**
     * Одиночная ошибка, описание этой ошибки
     * @example "Файл не найден"
     */
    message?: string;
    /**
     * Список ошибок, описание ошибок
     * @example [{"fieldName":"fileId","message":"Файл не найден"},{"fieldName":"fileId","message":"Файл не найден"}]
     */
    errors?: ErrorMessageWithField[];
}

/**
 * Список ошибок, описание ошибок
 * @example [{"fieldName":"fileId","message":"Файл не найден"},{"fieldName":"fileId","message":"Файл не найден"}]
 */
export interface ErrorMessageWithField {
    /**
     * Название поля, в котором произошла ошибка
     * @example "fileId"
     */
    fieldName?: string;
    /**
     * Описание ошибки
     * @example "Файл не найден"
     */
    message?: string;
}

/**
 * Категория продукта
 * @example "RANKS"
 */
export enum Category {
    RANKS = 'RANKS',
    BOOSTERS = 'BOOSTERS',
    CASES = 'CASES',
    RESOURCES = 'RESOURCES',
    OTHER = 'OTHER'
}

/** Скидка */
export type DiscountDto = {
    /**
     * Идентификатор скидки
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id?: string;
    /**
     * Название скидки
     * @example "Скидка на ранги"
     */
    name?: string;
    /** Тип скидки */
    discountType?: DiscountType;
    /**
     * Ограничена ли скидка по времени
     * @example true
     */
    isDiscountLimited?: boolean;
    /**
     * Дата начала скидки unix timestamp
     * @format int64
     * @example 1693914524
     */
    startDate: number;
    /**
     * Дата окончания скидки unix timestamp
     * @format int64
     * @example 1693914524
     */
    endDate: number;
    /**
     * Размер скидки в рублях или процентах
     * @format double
     * @example 10
     */
    discountAmount?: number;
} | null;

/**
 * Тип скидки
 * @example "PERCENT"
 */
export enum DiscountType {
    AMOUNT = 'AMOUNT',
    PERCENTAGE = 'PERCENTAGE'
}

export interface ProductOutDto {
    /**
     * Идентификатор продукта
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id?: string;
    /**
     * Название продукта
     * @example "VIP"
     */
    name?: string;
    /**
     * Описание продукта (markdown support)
     * @example "Подписка на *VIP-статус* на _30 дней_"
     */
    description?: string | null;
    /**
     * Цена продукта без скидки
     * @format double
     * @example 1000.02
     */
    priceWithoutDiscount?: number;
    /**
     * Цена продукта со скидкой
     * @format double
     * @example 500.01
     */
    priceWithDiscount?: number;
    /**
     * Ссылка картинки продукта
     * @example "/public/files/f-00000000-0000-0000-0000-000000000000-example.png"
     */
    imagePath?: string | null;
    /**
     * Ссылка на предыдущий товар для расчета цены доплаты (если товар участвует в системе "Доплата"
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    previousProductForTopUpId?: string | null;
    /**
     * Количество покупаемого товара
     * @format int32
     * @example 1
     */
    quantity?: number;
    /** Категория продукта */
    category?: Category;
    /** Категория длительности продукта */
    validityType?: ValidityType;
    /** Длительность продукта */
    validityPeriod?: ValidityPeriod;
    /** Скидка */
    discount?: DiscountDto;
    /**
     * Порядковый номер для сортировки
     * @format int32
     * @example 0
     */
    order?: number;
    /**
     * Куплен ли товар?
     * @example true
     */
    isAlreadyBought?: boolean | null;
    singlePurchase?: boolean;
}

/**
 * Длительность продукта
 * @example "MONTHLY"
 */
export enum ValidityPeriod {
    MONTHLY = 'MONTHLY',
    LIFE_TIME = 'LIFE_TIME'
}

/**
 * Категория длительности продукта
 * @example "PERMANENT"
 */
export enum ValidityType {
    PERMANENT = 'PERMANENT',
    TEMPORARY = 'TEMPORARY'
}

export interface ProductEditInDto {
    /**
     * Идентификатор продукта
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id: string;
    /**
     * Название продукта
     * @example "VIP"
     */
    name: string;
    /**
     * Описание продукта (markdown support)
     * @example "Подписка на *VIP-статус* на _30 дней_"
     */
    description?: string | null;
    /**
     * Цена продукта
     * @format double
     * @example 1000
     */
    price: number;
    /**
     * ID картинки
     * @example "f-00000000-0000-0000-0000-000000000000"
     */
    imageId?: string | null;
    /**
     * Ссылка на предыдущий товар для расчета цены доплаты (если товар участвует в системе "Доплата"
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    previousProductForTopUpId?: string | null;
    /**
     * Количество покупаемого товара
     * @format int32
     * @example 1
     */
    amount: number;
    /** Категория продукта */
    category: Category;
    /** Категория длительности продукта */
    validityType: ValidityType;
    /** Длительность продукта */
    validityPeriod?: ValidityPeriod;
    /** Скидка */
    discount?: DiscountDto;
    /**
     * Порядковый номер для сортировки
     * @format int32
     * @example 0
     */
    order: number;
    /**
     * Куплен ли товар?
     * @example true
     */
    isAlreadyBought?: boolean;
    singlePurchase?: boolean;
}

/** DTO для создания платежа */
export interface CreatePaymentDto {
    /**
     * Имя игрока
     * @example "BrainRTP"
     */
    playerName: string;
    /** Список товаров */
    productList?: ProductToBuyInDto[];
    /**
     * UUID промокода
     * @format uuid
     */
    promocode?: string | null;
}

/** DTO для добавления товара в корзину */
export interface ProductToBuyInDto {
    /**
     * Идентификатор продукта
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id: string;
    /**
     * Количество покупаемого товара
     * @format int32
     * @example 1
     */
    amount: number;
}

export interface ResultPaymentDto {
    /** @format double */
    outSum?: number;
    invId?: string;
    fee?: string;
    email?: string;
    signatureValue?: string;
    paymentMethod?: string;
    incCurrLabel?: string;
    shr?: object;
}

export interface ProductCreateInDto {
    /**
     * Название продукта
     * @example "VIP"
     */
    name: string;
    /**
     * Описание продукта (markdown support)
     * @example "Подписка на *VIP-статус* на _30 дней_"
     */
    description?: string | null;
    /**
     * Цена продукта
     * @format double
     * @example 1000
     */
    price: number;
    /**
     * Картинка продукта
     * @example "f-00000000-0000-0000-0000-000000000000"
     */
    imageId?: string | null;
    /**
     * Ссылка на предыдущий товар для расчета цены доплаты (если товар участвует в системе "Доплата"
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    previousProductForTopUpId?: string | null;
    /**
     * Количество покупаемого товара
     * @format int32
     * @example 1
     */
    quantity: number;
    /** Категория продукта */
    category: Category;
    /** Категория длительности продукта */
    validityType: ValidityType;
    /** Длительность продукта */
    validityPeriod?: ValidityPeriod;
    /**
     * Скидка
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    discountId?: string | null;
    /**
     * Порядковый номер для сортировки
     * @format int32
     * @example 0
     */
    order: number;
    singlePurchase?: boolean;
}

/** Информация о количестве игроков на сервере */
export interface Players {
    /**
     * Количество игроков на сервере
     * @format int32
     * @example 13
     */
    online?: number;
    /**
     * Максимальное количество игроков на сервере
     * @format int32
     * @example 100
     */
    max?: number;
}
