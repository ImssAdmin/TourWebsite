#!/bin/bash

# Vercel Environment Variables Setup Script
# This script automatically adds all required environment variables to Vercel

echo "🚀 Vercel Environment Variables Setup"
echo "======================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found!"
    echo "Installing Vercel CLI..."
    npm install -g vercel
    echo ""
fi

# Navigate to project directory
cd /Users/user/Documents/MyProject/TourWebsite

echo "📌 Logging in to Vercel..."
vercel login

echo ""
echo "📋 Adding environment variables..."
echo ""

# Function to add env variable for all environments
add_env_var() {
    local key=$1
    local value=$2
    
    echo "Adding $key..."
    
    # Add to production
    echo "$value" | vercel env add "$key" production --force
    
    # Add to preview
    echo "$value" | vercel env add "$key" preview --force
    
    # Add to development
    echo "$value" | vercel env add "$key" development --force
    
    echo "✓ $key added to all environments"
    echo ""
}

# Add all environment variables
add_env_var "DATABASE_URL" "postgresql://postgres.drphxcjhonrumzkfblem:lm%2820J3q%2Ch%21R@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

add_env_var "DIRECT_URL" "postgresql://postgres.drphxcjhonrumzkfblem:lm%2820J3q%2Ch%21R@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

add_env_var "JWT_SECRET" "jsadfkljsdfiisadfsdabfsdk"

add_env_var "SUPABASE_URL" "https://drphxcjhonrumzkfblem.supabase.co"

add_env_var "SUPABASE_ANON_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycGh4Y2pob25ydW16a2ZibGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjUwNTQsImV4cCI6MjA5ODcwMTA1NH0.Jh4BXqdzABSwkEiBFJUWtP8-otURrZsbH58nDaL9dTs"

add_env_var "SUPABASE_SERVICE_ROLE_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycGh4Y2pob25ydW16a2ZibGVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzEyNTA1NCwiZXhwIjoyMDk4NzAxMDU0fQ.XCPkTmJQF311VVEm4HAZVUPRQObGHgnDY9zkaEmFqIk"

echo ""
echo "✅ All environment variables added successfully!"
echo ""
echo "🔄 Now triggering a redeploy..."
vercel redeploy --prod

echo ""
echo "🎉 Done! Check deployment status at:"
echo "https://vercel.com/imssadmin/tour-website/deployments"
