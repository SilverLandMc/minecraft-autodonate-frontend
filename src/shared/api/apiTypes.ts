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

/** Базовая информация о скидке */
export interface DiscountBaseOutDto {
    /**
     * Дата создания unix timestamp
     * @format int64
     * @example 1693914524
     */
    createdDate: number;
    /**
     * Название скидки
     * @example "Скидка на ранги"
     */
    name: string;
    /** Тип скидки */
    discountType: DiscountType;
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
    endDate?: number;
    /**
     * Размер скидки в рублях или процентах
     * @format double
     * @example 10
     */
    discountAmount: number;
}

/** Скидка с id */
export type DiscountOutDto = DiscountBaseOutDto & {
    /**
     * Идентификатор скидки
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id: string;
    /**
     * Удалена ли скидка
     * @example false
     */
    isDeleted: boolean;
};

/** Базовая информация о скидке */
export interface DiscountBaseInDto {
    /**
     * Название скидки
     * @example "Скидка на ранги"
     */
    name: string;
    /** Тип скидки */
    discountType: DiscountType;
    /**
     * Дата начала скидки
     * @format date-time
     * @example "2024-02-07T15:30:00.000Z"
     */
    startDate: string;
    /**
     * Дата окончания скидки
     * @format date-time
     * @example "2024-02-08T15:30:00.000Z"
     */
    endDate?: string;
    /**
     * Размер скидки в рублях или процентах
     * @format double
     * @min 1
     * @example 10
     */
    discountAmount: number;
}

/** Скидка с ID */
export type DiscountInDto = DiscountBaseInDto & {
    /**
     * Идентификатор скидки
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id?: string;
};

/**
 * Тип скидки
 * @example "PERCENTAGE"
 */
export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    AMOUNT = 'AMOUNT'
}

/** Информация о сервере */
export interface ServerInfo {
    /**
     * Количество игроков на сервере
     * @example 13
     */
    online: number;
    /**
     * Максимальное количество игроков на сервере
     * @example 100
     */
    max: number;
}

/** DTO для создания платежа */
export interface CreatePaymentDto {
    /**
     * Имя игрока
     * @example "BrainRTP"
     */
    playerName: string;
    /** Список товаров */
    productList: ProductToBuyInDto[];
    /**
     * UUID промокода
     * @example "123e4567-e89b-12d3-a456-426614174000"
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
     * @example 1
     */
    amount: number;
}

/** Информация о игроке */
export interface PlayerInfoOutDto {
    /**
     * Имя игрока
     * @example "BrainRTP"
     */
    playerName: string;
    /** Уникальные товары (единоразовые покупки), которые есть у игрока */
    uniqueProducts?: string[] | null;
}

/** Ошибка или список ошибок */
export interface ErrorMessageResponse {
    /**
     * Одиночная ошибка, описание этой ошибки
     * @example "Файл не найден"
     */
    message: string;
    /** Список ошибок с полями */
    errors?: ErrorMessageWithField[] | null;
}

/** Детализация ошибки с полем */
export interface ErrorMessageWithField {
    /**
     * Поле, к которому относится ошибка
     * @example "fileId"
     */
    fieldName: string;
    /**
     * Описание ошибки
     * @example "Файл не найден"
     */
    message: string;
}

/** Продукт */
export interface ProductOutDto {
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
     * Цена продукта без скидки
     * @format double
     * @example 1000.02
     */
    priceWithoutDiscount: number;
    /**
     * Цена продукта со скидкой
     * @format double
     * @example 500.01
     */
    priceWithDiscount?: number | null;
    /**
     * Ссылка картинки продукта
     * @example "/public/files/f-00000000-0000-0000-0000-000000000000-example.png"
     */
    imagePath?: string | null;
    /**
     * ID файла картинки
     * @example "f-00000000-0000-0000-0000-000000000000"
     */
    imageId?: string | null;
    /**
     * Товар можно купить только один раз?
     * @example true
     */
    isSinglePurchase: boolean;
    /**
     * Ссылка на предыдущий товар для расчета цены доплаты (если товар участвует в системе "Доплата")
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    previousProductForTopUpId?: string | null;
    /** Категория продукта */
    category: Category;
    /** Категория длительности продукта */
    validityType: ValidityType;
    /** Длительность продукта */
    validityPeriod: ValidityPeriod;
    /** Скидка с id */
    discount?: DiscountOutDto;
    /**
     * Порядковый номер для сортировки
     * @example 0
     */
    order: number;
    /**
     * Количество покупаемого товара
     * @example 1
     */
    quantity: number;
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

/**
 * Категория длительности продукта
 * @example "PERMANENT"
 */
export enum ValidityType {
    PERMANENT = 'PERMANENT',
    TEMPORARY = 'TEMPORARY'
}

/**
 * Длительность продукта
 * @example "MONTHLY"
 */
export enum ValidityPeriod {
    MONTHLY = 'MONTHLY',
    LIFE_TIME = 'LIFE_TIME'
}

/** Промокод */
export type PromocodeOutDto = PromocodeBaseDto & {
    /**
     * Идентификатор промокода
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id?: string;
    /**
     * Текущее количество использований промокода
     * @example 5
     */
    currentUseCount?: number;
    /**
     * Удален ли промокод
     * @example true
     */
    isDeleted?: boolean;
    /** Скидка с id */
    discount?: DiscountOutDto;
    /**
     * Дата начала промокода (Unix timestamp)
     * @format int64
     * @example 1693914524
     */
    startDate?: number;
    /**
     * Дата окончания промокода (Unix timestamp)
     * @format int64
     * @example 1693914524
     */
    endDate?: number;
};

/** DTO для создания продукта */
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
     * @format uuid
     * @example "f-00000000-0000-0000-0000-000000000000"
     */
    imageId?: string | null;
    /**
     * Можно купить только один раз?
     * @example true
     */
    isSinglePurchase: boolean;
    /**
     * Ссылка на предыдущий товар для расчета цены доплаты (если товар участвует в системе "Доплата")
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    previousProductForTopUpId?: string | null;
    /**
     * Количество покупаемого товара
     * @min 1
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
     * @example 0
     */
    order: number;
}

/** DTO для редактирования продукта */
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
     * @format uuid
     * @example "f-00000000-0000-0000-0000-000000000000"
     */
    imageId?: string | null;
    /**
     * Можно купить только один раз?
     * @example true
     */
    isSinglePurchase: boolean;
    /**
     * Ссылка на предыдущий товар для расчета цены доплаты (если товар участвует в системе "Доплата")
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    previousProductForTopUpId?: string | null;
    /**
     * Количество покупаемого товара
     * @min 1
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
     * @example 0
     */
    order: number;
}

/** Обновление промокода */
export interface PromocodeUpdateDto {
    /**
     * Идентификатор промокода
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id: string;
    /**
     * Ограничение на использование промокода
     * @default false
     * @example true
     */
    isLimitedUse: boolean;
    /**
     * Максимальное количество использований промокода
     * @min 1
     * @example 10
     */
    maxUseCount: number;
    /**
     * Дата начала промокода
     * @format date-time
     * @example "2024-02-07T15:30:00.000Z"
     */
    startDate: string;
    /**
     * Дата окончания промокода
     * @format date-time
     * @example "2024-02-07T15:30:00.000Z"
     */
    endDate: string;
    /**
     * ID скидки
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    discountId: string;
}

/** Промокод */
export type PromocodeInDto = PromocodeBaseDto & {
    /**
     * ID скидки
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    discountId: string;
    /**
     * Дата начала промокода
     * @format date-time
     * @example "2024-02-07T15:30:00.000Z"
     */
    startDate: string;
    /**
     * Дата окончания промокода
     * @format date-time
     * @example "2024-02-07T15:30:00.000Z"
     */
    endDate: string;
};

/** Базовая информация о промокоде */
export interface PromocodeBaseDto {
    /**
     * Название промокода
     * @example "VIP"
     */
    name: string;
    /**
     * Ограничение на использование промокода
     * @default false
     * @example true
     */
    isLimitedUse: boolean;
    /**
     * Максимальное количество использований промокода
     * @min 1
     * @example 10
     */
    maxUseCount: number;
}

/** Платеж */
export interface PaymentOutDto {
    /**
     * Идентификатор платежа
     * @example "1"
     */
    paymentId?: string;
    /**
     * Ник игрока
     * @example "BrainRTP"
     */
    playerName?: string;
    /**
     * Общая стоимость
     * @format double
     * @example 100
     */
    totalPrice?: number;
    /** Промокод */
    promocode?: PromocodeOutDto;
    /** Статус платежа */
    status?: PaymentStatus;
    /** Список товаров */
    paymentProductList?: PaymentProductOutDto[];
}

/** Pageable Платеж */
export interface PageablePaymentOutDto {
    /** Список платежей */
    content?: PaymentOutDto[];
    /**
     * Общее количество элементов
     * @format int64
     * @example 100
     */
    totalElements?: number;
    /**
     * Общее количество страниц
     * @example 10
     */
    totalPages?: number;
    /**
     * Текущая страница
     * @example 1
     */
    currentPage?: number;
}

/** Товар в платеже */
export interface PaymentProductOutDto {
    /** Продукт */
    product?: ProductOutDto;
    /**
     * Количество товара
     * @example 1
     */
    amount?: number;
}

/** Статус платежа */
export enum PaymentStatus {
    INCOMPLETE = 'INCOMPLETE',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    EXPIRED = 'EXPIRED',
    UNTRACKABLE = 'UNTRACKABLE'
}

/** Топ продуктов */
export interface PurchaseTopProductsOutDto {
    /**
     * Название продукта
     * @example "VIP"
     */
    productName?: string;
    /**
     * Количество проданных продуктов
     * @example 100
     */
    totalSold?: number;
}

/** DTO для авторизации */
export interface LoginRequestDto {
    /**
     * Логин
     * @example "admin"
     */
    username: string;
    /**
     * Пароль
     * @example "admin"
     */
    password: string;
}
