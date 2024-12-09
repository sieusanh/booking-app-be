
/*

    CREATE TABLE hr_roles (
        id SERIAL PRIMARY KEY,
        key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
        status SMALLINT,
        "createdBy" VARCHAR(20),
        "updatedBy" VARCHAR(20),
        "createdAt" TIMESTAMP WITH TIME ZONE,
        "updatedAt" TIMESTAMP WITH TIME ZONE,

        title VARCHAR(50),
        actions VARCHAR[]
    )

    CREATE TABLE hr_accounts (
        id SERIAL PRIMARY KEY,
        key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
        status SMALLINT,
        "createdBy" VARCHAR(20),
        "updatedBy" VARCHAR(20),
        "createdAt" TIMESTAMP WITH TIME ZONE,
        "updatedAt" TIMESTAMP WITH TIME ZONE,

        username VARCHAR(50) UNIQUE,
        phone VARCHAR(50),
        email VARCHAR(50) UNIQUE,
        password VARCHAR(50),

        "fullName" VARCHAR(255),
        avatar VARCHAR(255),
        gender VARCHAR(20),
        "roleId" VARCHAR(20) REFERENCES hr_roles(key),
        "lastLoginAt" TIMESTAMP WITH TIME ZONE
    )

    // Hotel facilities
    CREATE TABLE fac_hotels (
        id SERIAL PRIMARY KEY,
        key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
        status SMALLINT,
        "createdBy" VARCHAR(20),
        "updatedBy" VARCHAR(20),
        "createdAt" TIMESTAMP WITH TIME ZONE,
        "updatedAt" TIMESTAMP WITH TIME ZONE,

        phone VARCHAR(50) UNIQUE,
        email VARCHAR(50) UNIQUE,
        address VARCHAR(255),
    )

    CREATE TABLE fac_rooms (
        id SERIAL PRIMARY KEY,
        key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
        status SMALLINT,
        "createdBy" VARCHAR(20),
        "updatedBy" VARCHAR(20),
        "createdAt" TIMESTAMP WITH TIME ZONE,
        "updatedAt" TIMESTAMP WITH TIME ZONE,

        no VARCHAR(50) UNIQUE,
        phone VARCHAR(50) UNIQUE,
        price REAL, 
    )

    CREATE TABLE sys_products (
    )

    CREATE TABLE sys_orders (
    )

    CREATE TABLE sys_payments (
    )

    CREATE TABLE sys_transactions (
    )

    CREATE TABLE sys_notifications (
    )

    CREATE TABLE sys_chats (
    )

    CREATE TABLE sys_images (
    )

    CREATE TABLE sys_discounts (
    )

    CREATE TABLE sys_customers (
    )
*/

