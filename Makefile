
.PHONY: all build clean install

# Default target
all: install build

# Install dependencies
install:
	npm install

# Build the extension
build:
	npm run build

# Clean build artifacts
clean:
	rm -rf dist

# Create distribution zip for Web Store
zip: build
	rm -f twitch-bonus-claimer.zip
	cd dist && zip -r ../twitch-bonus-claimer.zip .
