---
sidebar_position: 2
---

# RSLogix Studio 5000

## Overview
In this tutorial, you'll learn how to control ATOM over EtherNet/IP with RSLogix Studio 5000.

:::info Note
If you'd like to skip this tutorial, download the completed example project: [AtomExampleStudio5000.zip](./assets/studio5000/AtomExampleStudio5000.zip).
:::

## Prerequisites
1. A PC with RSLogix Studio 5000 installed (See [Installation Troubleshooting](#installation-troubleshooting) for help with installation issues):
   ![TwinCAT XAE Shell](./assets/studio5000/88.png)
2. A Logix PLC - a CompactLogix `1769-L19ER-BB1B` is used in this example, but you can follow along with any Logix PLC that supports EtherNet/IP.
3. Download ATOM's EDS file: [Atom.eds](./assets/Atom.eds)

## Hardware Setup

Connections:
- Connect port `1 (Front)`  on your PLC to your _PC_
- Connect port `2 (Rear)` on your PLC to _ATOM_ (either port)
- Connect a 24VDC power supply to ATOM and your PLC

![Hardware setup](./assets/studio5000/hardware-setup.jpg)

## PLC Configuration

### Upgrading firmware
Make sure to upgrade your PLC firmware to the lastest version to ensure compatibility with Studio 5000.

1. Connect your Logix PLC to your PC with a USB cable.
2. Launch `ControlFLASH Plus`:

![ControlFLASH Plus](./assets/studio5000/1.png)

3. Open the network browser:

![ControlFLASH Plus](./assets/studio5000/3.png)

4. Select your PLC under the `USB` category:
   
![ControlFLASH Plus](./assets/studio5000/2.png)

5. Select the device and latest firmware version, then click **Next**:

![ControlFLASH Plus](./assets/studio5000/4.png)

6. Click **Flash**:

![ControlFLASH Plus](./assets/studio5000/5.png)

7. After flashing succeeds, reboot your PLC.

![ControlFLASH Plus](./assets/studio5000/7.png)

### Configuring your PC's network settings

1. Open your PC's network settings and select edit on the Ethernet adapter connected to your PLC:

![ControlFLASH Plus](./assets/studio5000/89.png)

2. In the **Edit IP Settings** dialog, set:
   - **IP Address**: `192.168.30.245`
   - **Subnet Mask**: `255.255.255.0`

    Click **Save** to apply the settings.

    ![ControlFLASH Plus](./assets/studio5000/90.png)

3. Open RSLogix Classic and select **Communications** > **Configure Drivers**:

![ControlFLASH Plus](./assets/studio5000/20.png)

4. Select **EtherNet/IP Driver** and click **Add New**:

![ControlFLASH Plus](./assets/studio5000/21.png)

5. Click **OK** to add the driver:

![ControlFLASH Plus](./assets/studio5000/22.png)

6. Select the adapter with IP address `192.168.30.245`, then hit **Apply** and **OK**:

![ControlFLASH Plus](./assets/studio5000/23.png)

## ATOM Configuration

1. Connect ATOM to your PC using a USB-C cable. Launch [Control Panel](/control-panel/overview) and connect to your ATOM. In the **Network** tab, set the following:
   - **IP Address Configuration**: `Static`
   - **IP Address**: `192.168.30.100`
   - **Subnet Mask**: `255.255.255.0`

![ControlFLASH Plus](./assets/studio5000/27.png)

## Create a Studio 5000 project and connect to your PLC
1. Launch Studio 5000, select **File** > **New Project**. Name the project `AtomExampleStudio5000` and select `1769-L19ER-BB1B` (CompactLogix 5370). Click **OK**:

![Create Project Step 1](assets/studio5000/10.png)

2. Select `0 Modules` under Expansion I/O, then click **Finish**:

![Create Project Step 1](assets/studio5000/11.png)

3. Connect your PLC to your PC with a USB-B cable. In Studio 5000, select **Communications** > **Who Active**:

![Create Project Step 1](assets/studio5000/12.png)

4. Select your PLC under the USB category and click **Go Online**:

![Create Project Step 1](assets/studio5000/13.png)

> Ensure the switch on your PLC is set to `PROG` mode before downloading.
> ![Create Project Step 1](assets/studio5000/34.jpg)

5. Select **Download** and double check that the `Controller OK` indicator light turns green:

![Create Project Step 1](assets/studio5000/14.png)

![Create Project Step 1](assets/studio5000/16.png)

6. Right click `Controller AtomExampleStudio5000` and select **Properties**:

![Create Project Step 1](assets/studio5000/17.png)

7. In the **Internet Protocol** tab, set the following and hit **Apply** and **OK**:
   - Manually configure IP settings checked
   - **IP Address**: `192.168.30.50`
   - **Subnet Mask**: `255.255.255.0`

![ControlFLASH Plus](./assets/studio5000/18.png)

8. Disconnect the USB cable from your PLC. In Studio 5000, select **Communications** > **Who Active** again, then select your PLC under the Ethernet category and click **Go Online**:

![ControlFLASH Plus](./assets/studio5000/25.png)

![ControlFLASH Plus](./assets/studio5000/26.png)

> You should also see ATOM (with IP address `192.168.30.100`) under the `AB_ETHIP-1` category.

## Import EDS file

Select **Tools** > **Device Description Installation Tool** (some versions call it **EDS Hardware Installation Tool**)

![Import Atom Step 1](assets/studio5000/import-1.png)
![Import Atom Step 3](assets/studio5000/import-3.png)
![Import Atom Step 4](assets/studio5000/import-4.png)
![Import Atom Step 5](assets/studio5000/import-5.png)
![Import Atom Step 6](assets/studio5000/import-6.png)
![Import Atom Step 7](assets/studio5000/import-7.png)

## Add Atom to the project

1. Right-click **Ethernet** and select **New Module**:

![ControlFLASH Plus](./assets/studio5000/29.png)

2. In the **Catalog** tab, search for `Atom`, select it, and click **Create**:

![ControlFLASH Plus](./assets/studio5000/30.png)

3. In the **General** tab, set the **IP Address** to `192.168.30.100` and click **OK**:

![ControlFLASH Plus](./assets/studio5000/31.png)

## A basic example program

1. Right-click **Parameters and Local Tags** under `MainProgram` and select **New Tag** to create a tag:

![ControlFLASH Plus](./assets/studio5000/91.png)

2. Create _two__ new tags:
   - Tag 1
     - **Name**: `ATOM_FULL_ON`
     - **Data Type**: `BOOL`
   - Tag 2
     - **Name**: `ATOM_LINE_VOLTAGE`
     - **Data Type**: `DINT`

![ControlFLASH Plus](./assets/studio5000/57.png)

![ControlFLASH Plus](./assets/studio5000/92.png)

You can follow along with either the [Structured Text](#structured-text) or [Ladder Logic](#ladder-logic) examples below.

### Ladder Logic

1. In the `MainRoutine` file, select `Ring 0` and add an `Examine On` instruction:

![ControlFLASH Plus](./assets/studio5000/76.png)

2. Configure this instruction to examine the `ATOM_FULL_ON` tag:

![ControlFLASH Plus](./assets/studio5000/77.png)

3. Add an `Output Energize` instruction and select `Atom:O.Digital_RUN_Enable`:

![ControlFLASH Plus](./assets/studio5000/78.png)

![ControlFLASH Plus](./assets/studio5000/79.png)

4. Add a `Move` instruction and set _source_ to `10000` and _dest_ to `Atom:O.Digital_setpoint`.

![ControlFLASH Plus](./assets/studio5000/80.png)

![ControlFLASH Plus](./assets/studio5000/81.png)

5. Right-click and select **Add rung**. In this new rung, add a `MOVE` instruction and set _source_ to `Atom:I.AC_Line_Voltage` and _dest_ to `ATOM_LINE_VOLTAGE`:

![ControlFLASH Plus](./assets/studio5000/82.png)
![ControlFLASH Plus](./assets/studio5000/83.png)

6. Select the PLC dropdown and click **Download** to download the program to your PLC:

> Ensure the switch on your PLC is set to `PROG` mode before downloading.
> ![Create Project Step 1](assets/studio5000/34.jpg)

![ControlFLASH Plus](./assets/studio5000/42.png)

![ControlFLASH Plus](./assets/studio5000/43.png)

7. Flip the switch on your PLC to `RUN` mode.

![Create Project Step 1](assets/studio5000/35.jpg)

8. If everything worked properly, the controller **Run Mode** indicator light should turn green:

![ControlFLASH Plus](./assets/studio5000/44.png)

Next, jump to the [Creating a user interface](#creating-a-user-interface) section.

### Structured Text

1. Delete the default `MainRoutine`: 

![Create Project Step 1](assets/studio5000/32.png)

2. Right-click `MainProgram` and select **Add Routine**. Name it `MainRoutine`, set the _Type_ to `Structured Text`, and click **OK**:

![Create Project Step 1](assets/studio5000/33.png)

![Create Project Step 1](assets/studio5000/36.png)

3. Right-click `MainRoutine`, select **Properties**, and ensure `MainRoutine` is set as the _Main Routine_ in the **Configuration** tab:

![Create Project Step 1](assets/studio5000/37.png)

![Create Project Step 1](assets/studio5000/38.png)

4. Insert tags by right-clicking in `MainRoutine` and selecting **Browse Tags**. 

![Create Project Step 1](assets/studio5000/39.png)

5. You can insert `Atom:I` (input) and `Atom:O` (output) tags to control ATOM:

![Create Project Step 1](assets/studio5000/40.png)

6. Add the following code to `MainRoutine`:

```pascal
IF ATOM_FULL_ON THEN
	Atom:O.Digital_RUN_Enable := 1;
	Atom:O.Digital_setpoint := 10000;
ELSE
	Atom:O.Digital_RUN_Enable := 0;
	Atom:O.Digital_setpoint := 0;
END_IF;

ATOM_LINE_VOLTAGE := Atom:I.AC_Line_Voltage;
```

![Create Project Step 1](assets/studio5000/61.png)

Next, jump to the [Creating a user interface](#creating-a-user-interface) section.

### Creating a user interface

:::info
> Studio 5000 comes with a separate program called **View Designer** for creating user interfaces.
> It's usually installed at `C:\Program Files (x86)\Rockwell Software\Studio 5000\View Designer\ENU\V10\ViewDesigner.exe`
:::

1. Launch View Designer and create a new project with the following settings:
   - **Controller[0] Reference Name**: `AtomExampleStudio5000`
   - **Logix Project File**: `path-to-your-project\AtomExampleStudio5000.ACD`
   - **HMI to Controller Path**: `192.168.30.50`
   - **Emulerator to Controller Path**: `NETWORK\192.168.30.50`

![Create Project Step 1](assets/studio5000/59.png)

2. Open `Screen_001`:

![Create Project Step 1](assets/studio5000/63.png)

3. In the **CommonControls** toolbox, drag three components onto the screen:
   - **Button**
   - **Numeric Display**
   - **Text Display**

![Create Project Step 1](assets/studio5000/64.png)

![Create Project Step 1](assets/studio5000/65.png)

4. Select the **Text Display** component and set the text to `AC Line Voltage`:

![Create Project Step 1](assets/studio5000/65.png)

5. Select the **Numeric Display** component and set the **Value** (in the **Properties** panel) to `ATOM_LINE_VOLTAGE`:

![Create Project Step 1](assets/studio5000/66.png)

![Create Project Step 1](assets/studio5000/67.png)

![Create Project Step 1](assets/studio5000/68.png)

6. Select the **Button* component and set the text to `Start / Stop`. In the **Events** panel, click **Add Event**, **Button Behavior**:

![Create Project Step 1](assets/studio5000/69.png)

7. Select **Toggle a tag on release** and set the tag to `ATOM_FULL_ON`:

![Create Project Step 1](assets/studio5000/70.png)

![Create Project Step 1](assets/studio5000/72.png)

![Create Project Step 1](assets/studio5000/73.png)

8. Select the **Emulate** button to launch the HMI emulator:

![Create Project Step 1](assets/studio5000/74.png)

9. Ensure your PLC is in `RUN` if it is not already.

10. In the emulator, you can click `Start / Stop` to toggle ATOM's operation. The **AC Line Voltage** display should show the current line voltage (in tenths of volts (e.g., `2300` for `230.0V`)):

![Create Project Step 1](assets/studio5000/75.png)

If you are connected to ATOM with Control Panel, you can watch the **Stop / Run** and **Fieldbus setpoint** controls change as you toggle the button in the Rockwell emulator.

![Create Project Step 1](assets/studio5000/45.png)

## Troubleshooting

### Installation troubleshooting

#### Activation issues

If you use your PC for multiple PLC environments (like Siemens TIA, Codesys, etc.) you may run into activation issues caused by CodeMeter licenses.

Follow [this guide](https://supportdesk.win911.com/s/article/RemoveLicensebuttonDisabledinCodeMeterControlCenter63e562107ab95) to delete other CodeMeter licenses as Studio 5000 requires exclusive access to the CodeMeter license manager.

Your CodeMeter should look like this:

![CodeMeter](./assets/studio5000/93.png)

#### Factory Talk activation

Use **Factory Talk Activation Manager** to ensure your have a valid Studio 5000 license.

![Factory Talk](./assets/studio5000/94.png)

#### Can't connect to PLC or ATOM

Use the `ping` utility on Windows to check if your PC can reach the PLC/ATOM:

![Ping](./assets/studio5000/ping.png)

If:
- Ping is successful - you have a configuration problem with your PC
- Ping is unsuccessful - you have a hardware configuration, PLC configuration, or ATOM configuration problem.

