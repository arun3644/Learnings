-- Add missing columns to existing tables

-- Add department column to admins table
ALTER TABLE admins ADD COLUMN IF NOT EXISTS department VARCHAR(255);

-- Add shift column to nurses table
ALTER TABLE nurses ADD COLUMN IF NOT EXISTS shift VARCHAR(50);
