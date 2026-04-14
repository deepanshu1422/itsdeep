#!/bin/bash
# itsdeep.io — Local build + deploy to DigitalOcean droplet
# Usage: ./deploy.sh
set -e

SERVER="root@165.232.178.119"
SSH_KEY="$HOME/.ssh/gurbani_do"
APP_DIR="/var/www/itsdeep"

echo "=== Building locally ==="
npm run build

echo "=== Syncing .next to server ==="
rsync -az --delete \
  -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
  .next/ $SERVER:$APP_DIR/.next/

echo "=== Syncing public folder ==="
rsync -az --delete \
  -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
  public/ $SERVER:$APP_DIR/public/

echo "=== Syncing src (for any server-side reads) ==="
rsync -az --delete \
  -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
  src/ $SERVER:$APP_DIR/src/

echo "=== Restarting PM2 ==="
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER \
  'export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && pm2 restart itsdeep && pm2 save'

echo ""
echo "=== Checking live site ==="
sleep 3
HTTP=$(curl -s -o /dev/null -w "%{http_code}" https://itsdeep.io/)
echo "https://itsdeep.io/ → HTTP $HTTP"
echo ""
echo "Deploy complete!"
