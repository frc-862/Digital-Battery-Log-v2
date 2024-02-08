# Digital-Battery-Log-v2
Version 2.0 Rewrite of raspberry pi digital battery logger

Log battery sign-outs with the battery number, time signed out/in, and battery stats (rint and state of charge) before and after use, all with mongodb running in a docker container and a packaged electron app running on X server.

## Table of Contents
1. Installation and Dependencies
2. Project Architecture 
3. Settings Overview

## Building for Raspberry Pi
Works when building locally (win11)
```bash
npm run generate
npm run build:linux
```
Finally `SCP` onto the pi (overwrite existing AppImage if needed)

## Installation and Dependencies

This installation guide assumes that you are installing this software on the intended hardware platform: A raspberry Pi 4b and a 7" touch screen. Success may vary on other untested hardware.

#### Installing Raspbian 64 bit
1. Download the Raspbian 64-bit image from the official Raspberry Pi website.
2. Insert a microSD card into your computer and use a tool like Etcher to flash the Raspbian image onto the card.
3. Eject the microSD card from your computer and insert it into your Raspberry Pi.
4. Connect your Raspberry Pi to a The touch screen
5. Power on your Raspberry Pi and wait for it to boot up.
Follow the on-screen prompts to set up your Raspberry Pi, including setting a password.

#### Installing NVM and NodeJS


##### Installing NVM

Run the NVM install script
``` 
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash 
```

Source .bashrc file 
``` 
$ source ~/.bashrc
```

##### Installing node

Install node with nvm 
```
$ nvm install node 
```

#### Installing docker 

Follow the docker installation guide for raspbian

##### Set up apt repository 
```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/raspbian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up Docker's Apt repository:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/raspbian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
##### Install Packages
```bash
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### Installing MongoDB
```
TODO
```

#### .bashrc setup and configuration

TODO
## Project Architecture 
TODO

## Settings Overview
* api:
  * sheetLink: a string representing the link to the Google Sheets document used for syncing data
  * syncTimeMinutes: an integer representing the sync time interval in minutes
  * centralServerMode: a boolean indicating whether the app is in central server mode
  * sheetsSync: a boolean indicating whether to sync data with Google Sheets
  * centralServerAPIRoot: a string representing the root URL for the central server API
  * database: an object containing the following properties:
    * address: a string representing the address of the database
    * port: an integer representing the port number of the database
    * databaseName: a string representing the name of the database
* dev:
  *  devServerPort: an integer representing the port number for the development server
* logging:
  * historyLengthHours: an integer representing the length of time to keep log history in hours
  * batteryYearRangeLower: an integer representing the lower range of years for battery logging
  * batteryYearRangeUpper: an integer representing the upper range of years for battery logging
  * batteryNumberRangeLower: an integer representing the lower range of battery numbers
  * batteryNumberRangeUpper: an integer representing the upper range of battery numbers
  * batteryLength: an integer representing the length of battery numbers
  * socRangeLower: an integer representing the lower range of state of charge (SOC) values
  * socRangeUpper: an integer representing the upper range of SOC values
  * socLengthUpper: an integer representing the length of SOC values for the upper range
  * socLengthLower: an integer representing the length of SOC values for the lower range
  * rintRangeLower: an integer representing the lower range of internal resistance (Rint) values
  * rintRangeUpper: an integer representing the upper range of Rint values
  * rintLength: an integer representing the length of Rint values
* colors:
  * primary: a string representing the primary color of the app
  * secondary: a string representing the secondary color of the app
  * tertiary: a string representing the tertiary color of the app
  * warning: a string representing the color for warning messages
  * primaryText: a string representing the color of primary text in the app
  * secondaryText: a string representing the color of secondary text in the app
