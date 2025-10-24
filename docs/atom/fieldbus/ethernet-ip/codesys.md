---
sidebar_position: 3
---

# Codesys

In this tutorial, you'll learn how to use Codesys with the SoftPLC emulator to connect to ATOM using EtherNet/IP and perform some
basic operations and monitor data. You can follow along using the SoftPLC emulator or your own PLC.

We provide examples for both ladder logic and structured text.

If you haven't yet, please review ATOM's [EtherNet/IP Profile](./overview).

If you'd like to skip the tutorial, you can download a completed example project:

- Download [ATOM_Codesys_LadderLogic_Example.zip](./assets/codesys/ladder/ATOM_Codesys_LadderLogic_Example.zip)
- Download [ATOM_Codesys_StructuredText_Example.zip](./assets/codesys/structured-text/ATOM_Codesys_StructuredText_Example.zip)

## Prerequisites
1. Install [Codesys](https://www.codesys.com/download.html)
2. Download ATOM's [EDS file](./assets/ATOM.eds)

## Hardware setup
Connect 24V to your PLC and Atom unit with the provided power cable. Connect Atom to your PC with an Ethernet cable.

![Atom and PLC hardware setup](./assets/codesys/hardware-setup.png)

:::info
To simplify this diagram, we have not connected a load to Atom. You may connect a load or leave it disconnected, either way is fine
for the purposes of this tutorial. 

If you do not connect a load, you can still verify your PLC is working by connecting a USB
cable to Atom and using Control Panel to watch the parameters change/verify the PLC is receiving the correct monitor data.
:::

## Configuring Atom network settings
Connect your Atom unit to your PC using a USB cable. Open Control Panel and update your Atom's communication parameters. When you're finished,
click **Send IP Address**, then go to **Actions** in the upper right and select **Store Parameter Values to EEPROM**:

![Atom network settings in Control Panel](../profinet/assets/codesys/control-panel.png)

## Create a Codesys project
Create a new Codesys project using the **Standard project with Application Composer** template:

![Create project step 1](assets/codesys/codesys-create-project-1.png)

Check each library to include it in the project and select **CODESYS Control WIN V3 x64** as the device:

![Create project step 2](assets/codesys/codesys-create-project-2.png)

## Adding an EtherNet/IP Scanner
Next we'll add an EtherNet/IP Scanner module. This allows the PLC to discover EtherNet/IP devices on the network (in our case, ATOM) and establish a connection with them.

First, right click **Device** and select **Add Device**:

![Add device step 1](./assets/codesys/codesys-add-scanner-1.png)

Next, expand **Ethernet Adapter** and select **Ethernet**, then click **Add Device**:

![Add device step 2](./assets/codesys/codesys-add-scanner-2.png)

The newly added **Ethernet** device will now appear in the device tree. Double click **Ethernet (Ethernet)** to open its configuration tab.
Within the **General** configuration tab, use the button indicated by the red arrow to select the network interface of the host machine that will
be used to communicate with ATOM. In our case, we have a `TEST-NET` interface but this will be different for you.

![Add device step 3](./assets/codesys/codesys-add-scanner-3.png)

Next, right click **Ethernet (Ethernet)** and select **Add Device**:

![Add device step 4](./assets/codesys/codesys-add-scanner-4.png)

Expand **EtherNet/IP Scanner**, select **EtherNet/IP Scanner**, then click **Add Device**:

![Add device step 5](./assets/codesys/codesys-add-scanner-5.png)

Your device tree should update to include the **EtherNet/IP Scanner** device.

## Adding ATOM to the scanner

First, we'll import ATOM's EDS file you downloaded [earlier](#prerequisites) into our Codesys device library.
Open the tools menu and select **Device repository**:

![Import eds step 1](./assets/codesys/codesys-import-device-1.png)

Next, click **Install** and select the `ATOM.eds` file. After you click install,
**Atom** will appear under the **EtherNet/IP Remote Adapter** category. Click **Close** to dismiss the dialog:

![Import eds step 2](./assets/codesys/codesys-import-device-2.png)

Now, we'll add ATOM to the scanner. Right click **EtherNet/IP Scanner (EtherNet/IP Scanner)** and select **Add Device**:

![Add ATOM step 1](./assets/codesys/codesys-add-atom-1.png)

Expand **EtherNet/IP Remote Adapter** and select **Atom**, then click **Add Device**:

![Add ATOM step 2](./assets/codesys/codesys-add-atom-2.png)

Finally, double click **Atom (Atom)** to open its configuration tab. In the **General** tab, set the **IP Address** to the IP address of your ATOM device:

![Add ATOM step 3](./assets/codesys/codesys-add-atom-3.png)

## Create a program

Next, we'll create a PLC program. We provide examples for both ladder logic and structured text:

- [Program with ladder logic](#example-ladder-logic)
- [Program with structured text](#example-structured-text)

## Example: Ladder logic

### Creating the program

Right click **Application** and select **Add Object > POU**:

![Ladder logic example step 1](./assets/codesys/ladder/codesys-ladder-program-1.png)

Set the name to `AtomProgram` and select **Ladder Diagram (LD)** as the Implementation language:

![Ladder logic example step 2](./assets/codesys/ladder/codesys-ladder-program-2.png)

Copy the following code into the top panel of the **AtomProgram** editor:
```
PROGRAM AtomProgram
VAR
	
RUN_SWITCH: BOOL;
SETPOINT: DINT;
TEMP: REAL;

ATOM_OUTPUT_SETPOINT: DINT;
ATOM_OUTPUT_RUN_ENABLE: BOOL;
ATOM_INPUT_TEMP: REAL;

END_VAR
```

After you've copied the code over, the editor for **AtomProgram** should look like this:

![Ladder logic example step 3](./assets/codesys/ladder/codesys-ladder-program-3.png)

In the bottom panel of the editor, we'll create a simple ladder logic program using the variables we just added above.

1. Create **3** networks total by right-clicking and selecting **Insert Network**
2. For each network, right click and insert **one** contact and **one** coil

![Ladder logic example step 4](./assets/codesys/ladder/codesys-ladder-program-4.png)

After you're finished, your ladder logic program should look like:

![Ladder logic example step 5](./assets/codesys/ladder/codesys-ladder-program-5.png)

For each rung, replace the `???` with the corresponding variables:

1. **Rung #1** - `RUN_SWITCH` and `ATOM_OUTPUT_RUN_ENABLE`
2. **Rung #2** - `SETPOINT` and `ATOM_OUTPUT_SETPOINT`
3. **Rung #3** - `ATOM_INPUT_TEMP` and `TEMP`

After you're finished, your ladder logic program should look like:

![Ladder logic example step 6](./assets/codesys/ladder/codesys-ladder-program-6.png)

Finally, we'll add a task to call **AtomProgram** from the PLC's control loop:

Right click **Task Configuration** and select **Add Object > Task**:

![Ladder logic example step 7](./assets/codesys/ladder/codesys-ladder-program-7.png)

Name your task `AtomTask` and click **OK**:

![Ladder logic example step 8](./assets/codesys/ladder/codesys-ladder-program-8.png)

Next, double click **AtomTask (IEC-Tasks)** to open its configuration tab. Click **Add Call** and select **Application > AtomProgram**. After doing so, AtomTask's configuration should look like:

![Ladder logic example step 9](./assets/codesys/ladder/codesys-ladder-program-9.png)

### Setting up visualization

Next, we'll set up a simple visualization display to control and monitor ATOM.

Right click **Application** and select **Add Object > Visualization**:

![Visualization step 1](./assets/codesys/ladder/codesys-ladder-visualization-1.png)

Make sure to check **Active** for **VisuSymbols (System)**, then click **Add**:

![Visualization step 2](./assets/codesys/ladder/codesys-ladder-visualization-2.png)

Name your visualization `AtomVisualization` and click **Add**:

![Visualization step 3](./assets/codesys/ladder/codesys-ladder-visualization-3.png)

Double click **AtomVisualization** to open its configuration editor. From the **Visualization ToolBox** panel
on the right, select the **Lamps/Switches/Bitmaps** category and add a lamp and a dip switch:

![Visualization step 4](./assets/codesys/ladder/codesys-ladder-visualization-4.png)

Next, in the **Common controls** category, add a slider:

![Visualization step 5](./assets/codesys/ladder/codesys-ladder-visualization-5.png)

Finally, in the **Measurement controls** category, add a meter:

![Visualization step 6](./assets/codesys/ladder/codesys-ladder-visualization-6.png)

### Wiring up the controls

Next, we'll connect the controls to our PLC program. Select the dip switch and set
the **Variable** field to `AtomProgram.RUN_SWITCH` as indicated by the red arrow:

![Visualization config step 1](./assets/codesys/ladder/codesys-ladder-visualization-config-1.png)

Select the lamp and set the **Variable** field to `AtomProgram.RUN_SWITCH` as indicated by the red arrow:

![Visualization config step 2](./assets/codesys/ladder/codesys-ladder-visualization-config-2.png)

Select the slider and set the **Variable** field to `AtomProgram.SETPOINT` and set **Scale end** to `10000`: 

![Visualization config step 3](./assets/codesys/ladder/codesys-ladder-visualization-config-3.png)

Select the meter and set the **Variable** field to `AtomProgram.TEMP`:

![Visualization config step 4](./assets/codesys/ladder/codesys-ladder-visualization-config-4.png)

### Mapping variables

Finally, we'll map our PLC variables to ATOM. Double click **Atom** in the device tree to open its configuration window.
Select the **EtherNet/IP I/O Mapping** tab and set **Filter** to **Show only inputs**:

![Ladder mapping step 1](./assets/codesys/ladder/codesys-ladder-mapping-1.png)

Above, select the button indicated by the red arrow. This will open the **Input Assistant** dialog. Select
**Application > AtomProgram > ATOM_INPUT_TEMP** and click **Add**:

![Ladder mapping step 2](./assets/codesys/ladder/codesys-ladder-mapping-2.png)

After doing so, your input I/O mappings should look like:

![Ladder mapping step 3](./assets/codesys/ladder/codesys-ladder-mapping-3.png)

Change the **Filter** to **Show only outputs** and repeat the process for the outputs. Map **Digital setpoint**
to `Application.AtomProgram.ATOM_OUTPUT_SETPOINT` and **Digital RUN Enable** to `Application.AtomProgram.ATOM_OUTPUT_RUN_ENABLE`.

:::warning Take care
Make sure you map **Bit0** of **Digital RUN Enable** to **ATOM_OUTPUT_RUN_ENABLE**, NOT **Digital RUN Enable** itself.
:::

![Ladder mapping step 4](./assets/codesys/ladder/codesys-ladder-mapping-4.png)

## Example: Structured text

### Creating the program

Right click **Application** and select **Add Object > POU**:

![Structured text example step 1](./assets/codesys/structured-text/codesys-st-1.png)

Name your **POU** `AtomProgram` and select **Structured Text (ST)** as the language:

![Structured text example step 2](./assets/codesys/structured-text/codesys-st-2.png)

Next, let's create a basic program. We'll check to make sure no alarms are active and then write a setpoint value of `8000` and set run enable to `true`.

Copy the following code into the top panel of the **AtomProgram** editor:
```
PROGRAM AtomProgram
VAR
	
ATOM_OUTPUT_SETPOINT: BOOL;
ATOM_OUTPUT_RUN_ENABLE: BYTE;
ATOM_INPUT_INHIBIT_ALARM: BYTE;

END_VAR
```

Copy the following code into the main program section:
```
IF (ATOM_INPUT_INHIBIT_ALARM = 0) THEN
	ATOM_OUTPUT_SETPOINT := 8000;
	ATOM_OUTPUT_RUN_ENABLE := true;
END_IF
```

Your editor should look like:

![Structured text example step 3](./assets/codesys/structured-text/codesys-st-3.png)

Next, we'll add a new task to call our program. Right click **Task Configuration** and Select **Add Object > Task**:

![Structured text example step 4](./assets/codesys/structured-text/codesys-st-4.png)

Name your task `AtomTask` and click **Add**:

![Structured text example step 5](./assets/codesys/structured-text/codesys-st-5.png)

Next, double click **AtomTask (IEC-Tasks)** to open its configuration tab. Click **Add Call** and select **Application > AtomProgram**.
After doing so, **AtomTask**'s configuration should look like:

![Structured text example step 6](./assets/codesys/structured-text/codesys-st-6.png)

### Mapping variables

Next, we'll map our ATOM's I/O configuration to our program variables. Double click **Atom (Atom)** to open its configuration window,
then select the **EtherNet/IP I/O Configuration** tab. On the **Filter** dropdown indicated by the red arrow, select **Show only outputs**:

![Mapping step 1](./assets/codesys/structured-text/codesys-mappings-1.png)

Click the button indicated by the red arrow to map the **Digital setpoint** value:

![Mapping step 2](./assets/codesys/structured-text/codesys-mappings-2.png)

This button will open the **Input Assistant** dialog. Select the corresponding variable from your program and click **Ok**:

![Mapping step 3](./assets/codesys/structured-text/codesys-mappings-3.png)

Repeat this process so that your output variables are mapped like so:

:::warning Take care
Make sure you map **Bit0** of **Digital RUN Enable** to **ATOM_OUTPUT_RUN_ENABLE**, NOT **Digital RUN Enable** itself.
:::
![Mapping step 4](./assets/codesys/structured-text/codesys-ladder-mapping-4.png)

Switch the filter to **Show only inputs** and then map the **Inhibit alarm status** variable:

![Mapping step 5](./assets/codesys/structured-text/codesys-mappings-5.png)

## Running the program with SoftPLC
:::info
The instructions to run your program are the same regardless of whether you are using ladder logic or structured text.

The only difference is that in the ladder logic example, a visualization window will open that allows you to control ATOM.
:::

To debug the program, first make sure you start **Codesys WIN Control V3 - x64 SysTray**

![Debug step 1](./assets/codesys/codesys-debug-1.png)

This will launch the Codesys SoftPLC. You should see an icon appear in your systray and you can right click it and select **Start PLC** to start the SoftPLC:

![Debug step 2](./assets/codesys/codesys-debug-2.png)

Next, in Codesys double click **Application** to open its configuration window. Here you can select **Scan Network**
to discover your SoftPLC:

![Debug step 3](./assets/codesys/codesys-debug-3.png)

Finally, **Login** to your SoftPLC:

![Debug step 4](./assets/codesys/codesys-debug-4.png)

Then you can start debugging the program:

![Debug step 5](./assets/codesys/codesys-debug-5.png)

If you use Control Panel to monitor ATOM, you should see the **Stop / Run** state and the **Digital Setpoint** values change to reflect
the PLC program's instructions. If you followed the structured text example, the values will change once and remain fixed. If you followed
the ladder logic example, a visualization control panel will appear. Flipping the dip switch or adjusting the slider will immediately update
ATOM and the changes should reflect in real-time:

![Debug step 6](./assets/codesys/codesys-debug-6.png)