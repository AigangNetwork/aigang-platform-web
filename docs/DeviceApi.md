# Devices and Device API

This API should be product specific and this used interface works only as example. Device Api should be 100% trustable by insurance company.

This interface example serves battery insurance product for android phones as a workaround. To make this example work users should install Android Battery insurance APP form [here](https://github.com/AigangNetwork/aigang-contracts)  

## API Architecture

![DeviceApiArchitecture](images/DeviceApiArchitecture.png?raw=true)  

- Platform API requesting Device API for device data  
- Device API creating connection with android device and send request for latest data  
- Device sends latest data to Device API and sends response to the insurance API.

## Device API interface

- **register** function used to register new device. Properties:  

  - Imei  
  - FirebaseToken  
  - DeviceToken  

  Response:
  - DeviceId

- **data/task/{deviceId}** function for device data reading task. Properties:

  - DeviceId

  Response:
  - TaskId

- **data/{deviceId}** function for device data uploading. Properties:

  - DeviceId
  - TaskId
  - WearLevel
  - ChargeLevel
  - Region
  - AgeInMonths
  - Brand
  - DeviceModel
  - BatteryDesignCapacity
  - FirebaseToken
  - AndroidVersion

  Response:
  - Result (string OK)

- **data/{taskId}** function to receive device data by task ID. Properties:

  - TaskId


  Response:
  - DeviceId
  - WearLevel
  - ChargeLevel
  - Region
  - AgeInMonths
  - Brand
  - DeviceModel
  - BatteryDesignCapacity
  - FirebaseToken
  - AndroidVersion
