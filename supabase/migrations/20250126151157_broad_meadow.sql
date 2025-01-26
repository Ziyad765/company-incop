/*
  # Initial Schema Setup for Company Incorporation Platform

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - role (text) - 'admin' or 'client'
      - full_name (text)
      - created_at (timestamp)
    
    - incorporation_requests
      - id (uuid, primary key)
      - owner_name (text)
      - phone_number (text)
      - company_name (text)
      - address (text)
      - business_type (text)
      - additional_details (text)
      - status (text)
      - assigned_to (uuid, references profiles)
      - created_at (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for data access based on user roles
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'client')),
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create incorporation requests table
CREATE TABLE incorporation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_name text NOT NULL,
  phone_number text NOT NULL,
  company_name text NOT NULL,
  address text NOT NULL,
  business_type text NOT NULL,
  additional_details text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  assigned_to uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE incorporation_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Incorporation requests policies
CREATE POLICY "Anyone can create incorporation requests"
  ON incorporation_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all requests"
  ON incorporation_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Clients can view assigned requests"
  ON incorporation_requests FOR SELECT
  TO authenticated
  USING (
    (assigned_to = auth.uid()) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all requests"
  ON incorporation_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Clients can update assigned requests"
  ON incorporation_requests FOR UPDATE
  TO authenticated
  USING (
    assigned_to = auth.uid()
  );