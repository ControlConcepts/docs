---
sidebar_position: 2
---
# Overview
:::info
![ODVA Conformant Logo](./assets/odva-conformant-logo.svg)


ATOM is ODVA EtherNet/IP CT19 Conformant.
- **[Statement of Conformance](./assets/odva-statement-of-conformance.soc)**
- **[Declaration of Conformance](./assets/odva-doc.pdf)**
- **[Passing Test Report](./assets/odva-test-report.pdf)**
- **[ODVA listing](https://marketplace.odva.org/products/2567-atom)**
:::

## EDS
:::info
Download the EDS file for ATOM **[here](./assets/ATOM.eds)**.
:::

## Control Panel Communication Settings

![Control Panel Communication Settings](./assets/comm-settings.png)

Some communication settings can be configured in the **Communication** tab in [Control Panel](/control-panel/overview).

- Section `1`: TCP/IP settings
  - **IP Address Configuration**
    - `Static`: Use the IP address, subnet mask, and gateway specified below.
    - `DHCP`: Use DHCP to obtain an IP address.
  - **IP Address Setting**: The IP address of the ATOM controller.
  - **IP Address Monitor**: The current IP address of the ATOM controller.
  - **Subnet Mask**: The subnet mask of the ATOM controller.
  - **Gateway**: The gateway address for the ATOM controller.
- Section `2`: Network Timeout
  - The EtherNet/IP heartbeat timeout (Encapsulation Inactivity Timeout) in seconds.
  - You can configure a network timeout action to perform when the device loses communication with the PLC:
    - `None`: Do nothing
    - `STOP, fault shutdown`: STOP the controller, disabling output
    - `Use network timeout setpoint`: Configure an alternative setpoint to use when the controller loses communication with the PLC.
- Section `3`: Ethernet status
  - Indicates the status of both RJ45 ports, IP address configuration, conflict detection, and any other errors with the EtherNet/IP connection.

:::info
## Control Panel and PLC software

These settings are synchronized with your PLC environment. You do not have to use Control Panel to change these settings - you can stay in your PLC software.
Control Panel merely provides them as an altnerative way to configure ATOM's EtherNet/IP settings.

You can use Control Panel simultaneously with your PLC software without issues.
:::

:::warning
## IP Address Conflict Detection

ATOM uses **IP Address Conflict Detection** to detect IP address conflicts on the network. If ATOM detects another device using the same IP address, it will disable all network communication until the conflict is resolved.

Please ensure all devices on the network are assigned unique a IP address.
:::

## Hardware considerations

:::warning
## Daisy chaining

As ATOM has two RJ45 ports, it can be easily daisy-chained. When daisy-chaining ATOM, take care to avoid a loop in the network. In some loop configurations, ATOM is susceptible to
network broadcast storms, which can cause the controller to become unresponsive. If you are daisy-chaining ATOM, ensure that the network is loop-free.

ATOM works with both unmanaged and managed switches. We recommend a managed switch for larger networks to give you more control over the network topology.
:::

## Parameters
### Overview
ATOM makes 30 parameters accessible to EtherNet/IP. These parameters are made available through the CIP Assembly Object (code `0x04`) and a custom ParameterLink object (code `0x64`).
The assembly object is most commonly used to read and write parameters from a PLC. The ParameterLink object is a custom object defined by Control Concepts that can be used to individually control
parameters and is less commonly used.
### Output Assembly (Class `0x04`, Instance `0x01`)
|#|Name|Type|Description|Read/Write|
|---|---|---|---|---|
|1|Digital setpoint|DINT|A value between 0 and 10,000 indicating the desired output current. The value is scaled to the output range of ATOM. For example, if the output range is 0-100A, a value of 5000 would set the output to 50A.|Read/Write|
|2|Digital run enable|BOOL|Enables or disables the output current. When disabled, the output current is set to 0A.|Read/Write|

### Input Assembly (Class `0x04`, Instance `0x02`)

|#|Name|Type|Description|Read/Write|
|---|---|---|---|---|
|3|Inhibit Alarm Status|BYTE|A bitfield indicating alarms that are preventing controller operation. See [Inhibit Alarm Status](#inhibit-alarm-status).|Read|
|4|Warning Alarm Status|BYTE|A bitfield indicating warning alarms. See [Warning Alarm Status](#warning-alarm-status).|Read|
|5|Feedback Read Status|BOOL|A bitfield indicating if controller has acquired feedback. See [Feedback Read Status](#feedback-read-status).|Read|
|6|AC Line Frequency|REAL|The AC line frequency in Hz.|Read|
|7|AC Line Voltage|REAL|The AC line voltage in volts.|Read|
|8|Load Voltage|REAL|The load voltage in volts.|Read|
|9|Load Current|REAL|The load current in amps.|Read|
|10|Load Resistance|REAL|The load resistance in ohms.|Read|
|11|Heatsink Temperature|REAL|Heatsink temperature, in degrees celsius.|Read|
|12|Output Duty Cycle %|REAL|Indicates the amount, in percent, that the output of the controller is ON|Read|
|13|Setpoint reference|REAL|Reference input to control compensation loop in units determined by "feedback type"|Read|
|14|Feedback|REAL|The control output supplied to the load in units determined by "feedback type"|Read|
|15|Partial Load Fault Target Resistance|REAL|Expected nominal resistance, in Ohms, of the load. Used for partial load fault detection.|Read|
|16|Partial Load Fault Resistance|REAL|The actual load resistance in Ohms. Compared with #15 to determine if a partial load fault has occurred.|Read|
|17|Partial Load Fault Resistance Deviation|REAL|The tolerable percentage that parameter #15 and #16 may differ by until a partial load fault will be triggered.|Read|
|18|Firmware ID|DINT|Indicates the version of firmware that is loaded, dictating which features are available.|Read|
|19|Firmware major revision|DINT|Indicates which revision of the firmware is loaded. Major revisions fix critical bugs or add significant new features.|Read|
|20|Firmware minor revision|DINT|Indicates which minor revision of the firmware is loaded. Minor revisions fix minor issues and/or add minor improvements.|Read|
|21|Full Scale Voltage|DINT|The expected output voltage when the controller output is fully on.|Read|
|22|Full Scale Current|REAL|The expected current when the controller output is fully on.|Read|
|23|AC Line Status|BYTE|A bitfield indicating the status of the connected AC Line. See [AC Line Status](#ac-line-status).|Read|
|24|Load Status|BYTE|A bitfield indicating the load status. See [Load status](#load-status).|Read|
|25|Controller Status|BYTE|A value indicating the operational status of the controller. See [Controller status](#controller-status).|Read|
|26|Controller State|BYTE|A value indicating the controller state. See [Controller state](#controller-state).|Read|
|27|EEPROM Status|WORD|A bitfield indicating the EEPROM status. Seee [EEPROM Status](#eeprom-status).|Read|
|28|EEPROM Status 2|WORD|Identical to parameter #27|Read|
|29|Error Latch|BYTE|A bitfield used for diagnostic troubleshooting. See [Error Latch](#error-latch).|Read|
|30|Miscellaneous Status|BYTE|A bitfield indicating miscellaneous status information. See [Miscellaneous Status](#miscellaneous-status).|Read|

### Additional parameter descriptions

#### Inhibit Alarm Status
Inhibit alarm status is a 8-bit bitfield:

|7|6|5|4|3|2|1|0|
|-|-|-|-|-|-|-|-|
|Reserved|Reserved|Reserved|Reserved|Feedback Loss|Over Temperature|Over Current Trip|AC Line Lock Loss|

If any bit is set to 1, the controller will _not_ be allowed to run.

#### Warning Alarm Status
Warning alarm status is a 8-bit bitfield:

|7|6|5|4|3|2|1|0|
|-|-|-|-|-|-|-|-|
Reserved|Reserved|High temperature|Shorted SCR|Open Load|Partial Load Fault|Current Limit|Voltage Limit|

Warning alarms are not considered critical and will not prevent the controller from running.

#### Feedback Read Status
Feedback status is a 8-bit bitfield:

|7|6|5|4|3|2|1|0|
|-|-|-|-|-|-|-|-|
|Reserved|Reserved|Reserved|Reserved|Reserved|Reserved|Reserved|Timeout|

Indicates whether the controller has acquired feedback on the line. If any bit is set to 1,
then the controller has lost feedback.

#### AC Line Status 
AC Line status is a 8-bit bitfield:

|7|6|5|4|3|2|1|0|
|-|-|-|-|-|-|-|-|
|Reserved|Reserved|Sync-Locked (to AC Line)|Pre-Lock 2|Pre-Lock 1|Reserved|AC Line B OK|AC Line A OK|

Bits 5 must be set to 1 before the controller can provide power to the load.

#### Load Status 
Load status is a 8-bit bitfield:

|7|6|5|4|3|2|1|0|
|-|-|-|-|-|-|-|-|
|Reserved|Reserved|Reserved|Open Load|Reserved|Reserved|Reserved|Shorted SCR|
#### Controller Status 
Controller status is one of:

|Value|Description|
|-|-|
|0|Disabled|
|1|Initialization|
|2|Normal, operating|
|3|Calibration|
|4|Diagnostic|
#### Controller State 
Controller state is one of:

|Value|State|Description|
|-|-|-|
|0|STOP|The state the controller is in when AC Line voltage is not present.|
|1|RUN|The state the controller is in when AC Line voltage is present and the controller is synchronized to the AC line.|
|2|FAULT|A latching state of output shutdown caused by over current or over temperature alarms. A power cycle or processor reset is required to clear this state.|
|3|FAULT RESET|Used as a temporary state to transition from FAULT to RUN once again.|
#### EEPROM Status
EEPROM status is an 16-bit bitfield. EEPROM is used to store controller configuration and calibration data. Any errors
in EEPROM may indicate that the firmware is corrupted.

|Bit|Description|
|-|-|
|0|EEPROM Initialization|
|1|SP Table Error|
|2|MFG CP Table Error|
|3|Calibration Table Error|
|4|Reserved|
|5|Reserved|
|6|Backup Calibration Table Error|
|7|Bottom Board Calibration Table Error|
|8|SP Definition Table needs updating|
|9|Bottom Board Calibration Backup Error|
|10|Reserved|
|11|Reserved|
|12|EEPROM is write protected|
|13|Reserved|
|14|Reserved|
|15|Feedback Calibration Table has changed, store to EEPROM|

#### Error Latch
Error latch is a 8-bit bitfield:

|7|6|5|4|3|2|1|0|
|-|-|-|-|-|-|-|-|
|Reserved|Reserved|Reserved|Feedback loss|SCR timing loss|Line Frequency failure|Phase loss or missing cycle|Line Lock Loss|

Error latch is provided as a diagnostic troubleshooting aid.

#### Miscellaneous Status
Miscellaneous status is an 8-bit bitfield:

|7|6|5|4|3|2|1|0|
|-|-|-|-|-|-|-|-|
|Reserved|Initialization in progress|Reserved|Reserved|Waiting for ENTER key during initialization|Reserved|USB Powered|Reserved|

### Data types

The data types listed above in the parameter table are defined in the CIP standard as:

|Type|Size|Description|
|---|---|---|
|BOOL|1 byte|Boolean value|
|BYTE|1 byte|8-bit bitmap|
|WORD|2 bytes|16-bit bitmap|
|DWORD|4 bytes|32-bit bitmap|
|LWORD|8 bytes|64-bit bitmap|
|USINT|1 byte|Unsigned 8-bit integer|
|UINT|2 bytes|Unsigned 16-bit integer|
|UDINT|4 bytes|Unsigned 32-bit integer|
|ULINT|8 bytes|Unsigned 64-bit integer|
|SINT|1 byte|Signed 8-bit integer|
|INT|2 bytes|Signed 16-bit integer|
|DINT|4 bytes|Signed 32-bit integer|
|LINT|8 bytes|Signed 64-bit integer|
|REAL|4 bytes|32-bit floating point number|
|LREAL|8 bytes|64-bit floating point number|

:::info
Rockwell's RSLogix Studio 5000 does not support unsigned integers. Any EDS file that contains unsigned integers will cause issues when it
is imported into Studio 5000. To avoid this issue, ATOM uses signed integers for all integer types, regardless of whether the value may
be negative or not. For example, parameter #1, _Digital setpoint_ is represented as a signed 32-bit integer, but it may never be negative.
:::

## Other resources

:::info
Detailed information about ATOM's EtherNet/IP profile is also available as a **[downloadable word document](./assets/atom-eip-profile.docx)**.
:::

## Advanced
ATOM has many more parameters beyond the 30 made available through EtherNet/IP. The default profile listed above should be sufficient for the majority of use cases. 

If this is not the case, you can use [Control Panel](https://ccipower.com/products/accessories/control-panel-software) to adjust or monitor all parameters.

In the rare case that you need more parameters available through ATOM's EtherNet/IP profile, Control Concepts does have the ability to make additional parameters available or
to change the data type of included parameters. Please [contact us](https://ccipower.com/how-contact-us) if you would like a custom EtherNet/IP profile. There may be a service
fee for custom EtherNt/IP profiles as they require new EDS files, device-reconfiguration and testing.