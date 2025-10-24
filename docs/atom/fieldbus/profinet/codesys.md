---
sidebar_position: 3
---

# Codesys

In this tutorial, you'll learn how to use Codesys with the SoftPLC emulator to connect to ATOM using Profinet and perform some
basic operations and monitor data. You can follow along using the SoftPLC emulator or your own PLC.

We provide examples for both ladder logic and structured text.

If you haven't yet, please review ATOM's [Profinet Profile](./overview).

If you'd like to skip the tutorial, you can download a completed example project:

- Download [ATOM_Codesys_Profinet_LadderLogic_Example.zip](./assets/codesys/ladder/ATOM_Codesys_Profinet_LadderLogic_Example.zip)
- Download [ATOM_Codesys_Profinet_StructuredText_Example.zip](./assets/codesys/structured-text/ATOM_Codesys_Profinet_StructuredText_Example.zip)

## Prerequisites
1. Install [Codesys](https://www.codesys.com/download.html)
2. Download ATOM's [GSDML file](./assets/ATOM-GSDML-20231108.zip)

## Hardware setup
:::warning Important
When Atom is configured for Profinet, the Ethernet port closest to the 24V power connector is **disabled**. You must use opposing Ethernet port
nearest the reset button as shown below or the PLC won't be able to connect to Atom.
:::

Connect 24V to your PLC and Atom unit with the provided power cable. Connect Atom to your PC with an Ethernet cable.

![Atom and PLC hardware setup](./assets/hardware-setup.jpg)

:::info
To simplify this diagram, we have not connected a load to Atom. You may connect a load or leave it disconnected, either way is fine
for the purposes of this tutorial. 

If you do not connect a load, you can still verify your PLC is working by connecting a USB
cable to Atom and using Control Panel to watch the parameters change/verify the PLC is receiving the correct monitor data.
:::

## Configure Windows firewall
Codesys requires you to allow incoming Profinet UDP packets through the Windows firewall so that the SoftPLC is able to receive
UDP Profinet requests from Atom.

1. First, search for **Windows Defender Firewall with Advanced Security** and open it:

![Open Windows Defender Firewall with Advanced Security](./assets/codesys/firewall-1.png)

2. Right click on **Inbound Rules** and select **New Rule**:

![Add inbound rule in Windows firewall](./assets/codesys/firewall-2.png)

3. Select **Port**, then click **Next**:

![Select port](./assets/codesys/firewall-3.png)

4. Select **UDP**, then select **Specific local ports** and enter `34964, 49152-65535`, then click **Next**:

![Configure UDP local ports](./assets/codesys/firewall-4.png)

5. Select **Allow the connection**, then click **Next**:

![Select allow the connection](./assets/codesys/firewall-5.png)

6. Select which network types this rule applies to, then click **Next**:

![Select applicable network types](./assets/codesys/firewall-6.png)

7. Name the rule **Profinet**, then click **Finish**:

![Name the rule and finish creating it](./assets/codesys/firewall-7.png)

## Create a Codesys project
Create a new Codesys project using the **Standard project with Application Composer** template:

![Create project step 1](assets/codesys/codesys-create-project-1.png)

Check each library to include it in the project and select **CODESYS Control WIN V3 x64** as the device:

![Create project step 2](assets/codesys/codesys-create-project-2.png)

## Adding a Profinet Controller
Next we'll add a Profinet Controller device. This allows the SoftPLC to discover Profinet I/O devices on the network (in our case, ATOM) and establish a connection with them.

First, right click **Device** and select **Add Device**:

![Add device step 1](./assets/codesys/codesys-add-scanner-1.png)

Next, expand **PROFINET IO > Ethernet Adapter** and select **Ethernet**, then click **Add Device**:

![Add device step 2](./assets/codesys/codesys-add-scanner-2.png)

The newly added **Ethernet** device will now appear in the device tree. Double click **Ethernet (Ethernet)** to open its configuration tab.
Within the **General** configuration tab, use the button indicated by the red arrow to select the network interface of the host machine that will
be used to communicate with ATOM. In our case, we have a `TEST-NET` interface but this will be different for you.

:::info
Note, you may get an error dialog displaying "Gateway not configured properly". If this is the case, make sure your SoftPLC is online
by right-clicking the Codesys Win SysTray icon and starting the PLC. Navigate to the CODESYS Control Win V3 device in Codesys and use
**Scan Network** to make sure the gateway is detected. Then, you can select the network interface.
:::

![Add device step 3](./assets/codesys/codesys-add-scanner-3.png)

Next, right click **Ethernet (Ethernet)** and select **Add Device**:

![Add device step 4](./assets/codesys/codesys-add-scanner-4.png)

Expand **PROFINET IO > PROFINET IO Master**, select **PN-Controller** then click **Add Device**:

![Add device step 5](./assets/codesys/codesys-add-scanner-5.png)

Your device tree should update to include the **PN-Controller** device.

## Adding ATOM to the controller

First, we'll import ATOM's GSDML file you downloaded [earlier](#prerequisites) into our Codesys device library.
Open the tools menu and select **Device repository**:

![Import eds step 1](./assets/codesys/codesys-import-device-1.png)

Next, click **Install** and select the `GSDML-V2.43-Control-Concepts-ATOM_20231108.xml` file. After you click install,
**Atom** will appear under the **PROFINET IO > PROFINET IO Slave > I/O** category. Click **Close** to dismiss the dialog:

![Import eds step 2](./assets/codesys/codesys-import-device-2.png)

Now, we'll add ATOM to the PN-Controller. Right click **EtherNet/IP Scanner (EtherNet/IP Scanner)** and select **Add Device**:

![Add ATOM step 1](./assets/codesys/codesys-add-atom-1.png)

Expand **PROFINET IO > PROFINET IO Slave > I/O > CCI-ATOM** and select **ATOM SCR**, then click **Add Device**:

![Add ATOM step 2](./assets/codesys/codesys-add-atom-2.png)

Finally, double click **Atom (Atom)** to open its configuration tab. In the **General** tab, set the **Station name**, **IP Address**, and **Subnet mask** for your ATOM SCR:

:::info
You can find or change these parameters in Control Panel, or using a tool like [Proneta](https://www.siemens.com/global/en/products/automation/industrial-communication/profinet/proneta.html).
Make sure your station name and IP settings on Atom are properly set to the same values you enter here so that Codesys can connect to ATOM.

**Proneta**

If you're using Proneta, make sure to change the IP settings with **Store permanently** checked.

![Change network settings](./assets/codesys/proneta.png)

**Control Panel**

Connect your Atom unit to your PC using a USB cable. Open Control Panel and update your Atom's communication parameters. When you're finished,
click **Send IP Address**, then go to **Actions** in the upper right and select **Store Parameter Values to EEPROM**:
![Change network settings](./assets/codesys/control-panel.png)
:::

![Add ATOM step 3](./assets/codesys/codesys-add-atom-3.png)

Next, right click **ATOM_SCR (ATOM SCR)** and select **Add Device**:

![Add ATOM step 4](./assets/codesys/codesys-add-atom-4.png)

Here, you can choose which Profinet I/O modules to enable for your Atom. Select **DIO 8xLogicLevel** which allows both input and output of data to/from Atom. You
can add other I/O modules if needed. Then, click **Add Device**:

![Add ATOM step 5](./assets/codesys/codesys-add-atom-5.png)


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
ATOM_OUTPUT_RUN_ENABLE: USINT;
ATOM_INPUT_TEMP: REAL;

END_VAR
```

After you've copied the code over, the editor for **AtomProgram** should look like this:

![Ladder logic example step 3](./assets/codesys/ladder/codesys-ladder-program-3.png)

In the bottom panel of the editor, we'll create a simple ladder logic program using the variables we just added above.

1. Create **3** networks total by right-clicking and selecting **Insert Network** three times.
2. For the first _two_ rungs (networks), insert a contact and a coil.

![Ladder logic example step 4](./assets/codesys/ladder/codesys-ladder-program-4.png)

After you're finished, your ladder logic program should look like:

![Ladder logic example step 5](./assets/codesys/ladder/codesys-ladder-program-5.png)

On the third rung, right click and select **Insert Box**:

![Ladder logic example step 5a](./assets/codesys/ladder/codesys-ladder-program-5a.png)

Add a **TO_USINT** box:

![Ladder logic example step 5b](./assets/codesys/ladder/codesys-ladder-program-5b.png)

For the first two rungs, replace the `???` with the corresponding variables:

1. **Rung #1** - `ATOM_INPUT_TEMP` and `TEMP`
2. **Rung #2** - `SETPOINT` and `ATOM_OUTPUT_SETPOINT`

On the third rung, set the input to `EN` to `TRUE` and set the input parameter to `RUN_SWTICH` and output parameter to `ATOM_OUTPUT_RUN_ENABLE`.
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

Finally, we'll map our PLC variables to ATOM. Double click **DIO_8xLogicLevel (DIO 8xLogicLevel)** in the device tree to open its configuration window.
Select the **PNIO Module I/O Mapping** tab:

![Ladder mapping step 1](./assets/codesys/ladder/codesys-ladder-mapping-1.png)

Above, select the button indicated by the red arrow. This will open the **Input Assistant** dialog. Select
**Application > AtomProgram > ATOM_INPUT_TEMP** and click **Add**:

![Ladder mapping step 2](./assets/codesys/ladder/codesys-ladder-mapping-2.png)

After doing so, your input I/O mappings should look like:

![Ladder mapping step 3](./assets/codesys/ladder/codesys-ladder-mapping-3.png)

Repeat this for your output I/O mappings:
1. Map **Digital setpoint** to `Application.AtomProgram.ATOM_OUTPUT_SETPOINT`
2. Map **Digital run enable** to `Application.AtomProgram.ATOM_OUTPUT_RUN_ENABLE`

Change the **Filter** to **Show only outputs** and repeat the process for the outputs. Map **Digital setpoint**
to `Application.AtomProgram.ATOM_OUTPUT_SETPOINT` and **Digital RUN Enable** to `Application.AtomProgram.ATOM_OUTPUT_RUN_ENABLE`.

![Ladder mapping step 4](./assets/codesys/ladder/codesys-ladder-mapping-4.png)

You're all set! Go to the [Running the program with SoftPLC](#running-the-program-with-softplc) section to run your program.

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
	
ATOM_OUTPUT_SETPOINT: DINT;
ATOM_OUTPUT_RUN_ENABLE: USINT;
ATOM_INPUT_INHIBIT_ALARM: BYTE;

END_VAR
```

Copy the following code into the main program section:
```
IF (ATOM_INPUT_INHIBIT_ALARM = 0) THEN
	ATOM_OUTPUT_SETPOINT := 8000;
	ATOM_OUTPUT_RUN_ENABLE := 1;
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

Finally, we'll map our PLC variables to ATOM. Double click **DIO_8xLogicLevel (DIO 8xLogicLevel)** in the device tree to open its configuration window.
Select the **PNIO Module I/O Mapping** tab:

![ST mapping step 1](./assets/codesys/structured-text/codesys-mappings-1.png)

Above, select the button indicated by the red arrow. This will open the **Input Assistant** dialog. Select
**Application > AtomProgram > ATOM_INPUT_INHIBIT_ALARM** and click **Add**:

![ST mapping step 2](./assets/codesys/structured-text/codesys-mappings-2.png)

After doing so, your input I/O mappings should look like:

![ST mapping step 3](./assets/codesys/structured-text/codesys-mappings-3.png)

Repeat this for your output I/O mappings:
1. Map **Digital setpoint** to `Application.AtomProgram.ATOM_OUTPUT_SETPOINT`
2. Map **Digital run enable** to `Application.AtomProgram.ATOM_OUTPUT_RUN_ENABLE`

Change the **Filter** to **Show only outputs** and repeat the process for the outputs. Map **Digital setpoint**
to `Application.AtomProgram.ATOM_OUTPUT_SETPOINT` and **Digital RUN Enable** to `Application.AtomProgram.ATOM_OUTPUT_RUN_ENABLE`.

![ST mapping step 4](./assets/codesys/structured-text/codesys-mappings-4.png)

You're all set! Go to the [Running the program with SoftPLC](#running-the-program-with-softplc) section to run your program.

## Running the program with SoftPLC
:::info
The instructions to run your program are the same regardless of whether you are using ladder logic or structured text.

The only difference is that in the ladder logic example, a visualization window will open that allows you to control ATOM.
:::

To debug the program, first make sure you start **Codesys WIN Control V3 - x64 SysTray**

![Debug step 1](./assets/codesys/codesys-debug-1.png)

This will launch the Codesys SoftPLC. You should see an icon appear in your systray and you can right click it and select **Start PLC** to start the SoftPLC:

![Debug step 2](./assets/codesys/codesys-debug-2.png)

Next, connect your Atom to your PC via an Ethernet cable, ensuring to use the network interface you specified in the [Adding a Profinet controller](#adding-a-profinet-controller) section.

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