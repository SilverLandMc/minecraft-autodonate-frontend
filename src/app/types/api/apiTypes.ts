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

/** Скидка c id */
export interface DiscountOutDto {
    /**
     * Дата создания  unix timestamp
     * @format int64
     * @example 1693914524
     */
    createdDate: number;
    /**
     * Название скидки
     * @example "Скидка на ранги"
     */
    name?: string;
    /** Тип скидки */
    discountType?: DiscountType;
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
    /**
     * Идентификатор скидки
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id?: string;
    deleted?: boolean;
}

/**
 * Тип скидки
 * @example "PERCENT"
 */
export enum DiscountType {
    AMOUNT = 'AMOUNT',
    PERCENTAGE = 'PERCENTAGE'
}

/** Промокод */
export interface PromocodeDto {
    /**
     * Название промокода
     * @example "VIP"
     */
    name?: string;
    /**
     * Максимальное количество использований промокода
     * @format int32
     * @example 10
     */
    maxUseCount?: number;
    /**
     * Текущее количество использований промокода
     * @format int32
     * @example 5
     */
    currentUseCount?: number;
    /**
     * Дата начала промокода
     * @format int64
     * @example 1693914524
     */
    startDate: number;
    /**
     * Дата окончания промокода
     * @format int64
     * @example 1693914524
     */
    endDate: number;
    /** Скидка c id */
    discount?: DiscountOutDto;
    limitedUse?: boolean;
    deleted?: boolean;
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

/** Продукт */
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
    /** Категория продукта */
    category?: Category;
    /** Категория длительности продукта */
    validityType?: ValidityType;
    /** Длительность продукта */
    validityPeriod?: ValidityPeriod;
    /** Скидка c id */
    discount?: DiscountOutDto;
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
    /** Скидка c id */
    discount?: DiscountOutDto;
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

/** Скидка c id */
export interface DiscountInDto {
    /**
     * Название скидки
     * @example "Скидка на ранги"
     */
    name?: string;
    /** Тип скидки */
    discountType?: DiscountType;
    /**
     * Дата начала скидки
     * @format date-time
     */
    startDate: string;
    /**
     * Дата окончания скидки
     * @format date-time
     */
    endDate: string;
    /**
     * Размер скидки в рублях или процентах
     * @format double
     * @example 10
     */
    discountAmount?: number;
    /**
     * Идентификатор скидки
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id?: string;
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

/** Базовая информация о скидке */
export interface DiscountBaseInDto {
    /**
     * Название скидки
     * @example "Скидка на ранги"
     */
    name?: string;
    /** Тип скидки */
    discountType?: DiscountType;
    /**
     * Дата начала скидки
     * @format date-time
     */
    startDate: string;
    /**
     * Дата окончания скидки
     * @format date-time
     */
    endDate: string;
    /**
     * Размер скидки в рублях или процентах
     * @format double
     * @example 10
     */
    discountAmount?: number;
}

/** Цвет в формате RGB */
export type Color = {
    /**
     * Красный цвет в формате RGB
     * @format int32
     * @default 0
     */
    red?: number;
    /**
     * Зеленый цвет в формате RGB
     * @format int32
     * @default 0
     */
    green?: number;
    /**
     * Синий цвет в формате RGB
     * @format int32
     * @default 0
     */
    blue?: number;
} | null;

/** DTO для отправки новостей в Discord */
export interface DiscordNewsDto {
    /**
     * Заголовок новости
     * @example "Новое обновление"
     */
    title: string;
    /**
     * Описание новости
     * @example "Сегодня донат стал ещё дороже!"
     */
    description: string;
    /**
     * Ссылка на изображение справа от описания
     * @default "https://cdn4.iconfinder.com/data/icons/business-set-4-8/128/b-73-512.png"
     */
    thumbnail?: string | null;
    /** Цвет в формате RGB */
    color?: Color;
    /** Список сообщений */
    messageList?: Message[] | null;
    /**
     * ID канала, в который будет отправлено сообщение
     * @format int64
     * @default 1205470236388626400
     */
    channelId?: number | null;
}

/** Список сообщений */
export type Message = {
    /**
     * Заголовок сообщения
     * @example "Важное сообщение"
     */
    title: string;
    /**
     * Тело сообщения
     * @example "Сегодня донат стал ещё дороже. Второй раз."
     */
    content: string;
} | null;

/** Информация о игроке */
export interface PlayerInfoOutDto {
    /**
     * Имя игрока
     * @example "BrainRTP"
     */
    playerName?: string;
    /** Уникальные товары (единоразовые покупки), которые есть у игрока */
    uniqueProducts?: (string | null)[];
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

export interface AuthUserDto {
    /**
     * Идентификатор пользователя
     * @format uuid
     * @example "00000000-0000-0000-0000-000000000000"
     */
    id: string;
    /**
     * Фамилия и Имя пользователя (из Telegram)
     * @example "Иванов Иван"
     */
    fullName: string;
    /**
     * Telegram администратора
     * @example "brainrtp"
     */
    tgName: string;
    /** Роль пользователя (администратора) */
    role: Role;
}

/** Роль пользователя (администратора) */
export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
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
     * @format int32
     * @example 100
     */
    totalSold?: number;
}

/** Пагинация (query параметры) */
export interface PageDto {
    /**
     * Общее количество элементов
     * @format int64
     * @example 100
     */
    totalElements?: number;
    /**
     * Общее количество страниц
     * @format int32
     * @example 10
     */
    totalPages?: number;
    /**
     * Номер страницы
     * @format int32
     * @min 1
     * @default 1
     * @example 1
     */
    page?: number;
    /**
     * Количество элементов на странице
     * @format int32
     * @default 15
     * @example 15
     */
    size?: number;
}

export interface PagePaymentOutDto {
    /** @format int32 */
    totalPages?: number;
    /** @format int64 */
    totalElements?: number;
    /** @format int32 */
    size?: number;
    content?: PaymentOutDto[];
    /** @format int32 */
    number?: number;
    sort?: SortObject;
    pageable?: PageableObject;
    /** @format int32 */
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
}

export interface PageableObject {
    /** @format int64 */
    offset?: number;
    sort?: SortObject;
    paged?: boolean;
    unpaged?: boolean;
    /** @format int32 */
    pageNumber?: number;
    /** @format int32 */
    pageSize?: number;
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
    promocode?: PromocodeDto;
    /** Статус платежа */
    status?: 'INCOMPLETE' | 'SUCCESS' | 'FAILED' | 'EXPIRED' | 'UNTRACKABLE';
    /** Список товаров */
    paymentProductList?: PaymentProductOutDto[];
}

/** Товар в платеже */
export interface PaymentProductOutDto {
    /** Продукт */
    product?: ProductOutDto;
    /**
     * Количество товара
     * @format int32
     * @example 1
     */
    amount?: number;
}

export interface SortObject {
    empty?: boolean;
    unsorted?: boolean;
    sorted?: boolean;
}
