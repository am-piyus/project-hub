---
title: Project_01_H757_LED_Blink
status: Completed
featured: true
category: Embedded Systems
date_started: unknown
date_sealed: unknown
sources:
  - Claude
  - Gemini
  - ChatGPT
ai_systems:
  - Claude
tags:
  - STM32
  - STM32H757
  - STM32H757I-EVAL
  - embedded
  - LED
  - GPIO
  - GPIOK
  - STM32CubeIDE
  - STM32CubeMX
  - dual-core
  - Cortex-M7
  - HAL
  - bare-metal
---

# Project_01_H757_LED_Blink

> First confirmed LED blink on the STM32H757I-EVAL board (LD1, PK3) using the Cortex-M7
> core via the STM32CubeMX → STM32CubeIDE 2.0 workflow. The path to a working blink
> required diagnosing and resolving three independent failures: an eclipsec launcher
> crash caused by a space in the install path, a missing GPIO init caused by an unset Pin
> Context Assignment on the dual-core target, and a boot-sync deadlock that trapped M7
> execution before the blink loop was reached.

## Overview

The project set out to blink LD1 on the STM32H757I-EVAL using the Cortex-M7 core and to
establish a repeatable STM32CubeMX → STM32CubeIDE toolchain for future dual-core STM32H7
work. The original attempt used a MATLAB/Simulink flow, which silently produced a 168-byte
stub ELF due to a persistent eclipsec launcher failure that prevented the IDE scaffold from
ever being generated. After pivoting to STM32CubeIDE 2.0 directly, two further problems
were encountered: PK3 was left with no Pin Context Assignment so `MX_GPIO_Init` was never
emitted for CM7, and the active `DUAL_CORE_BOOT_SYNC_SEQUENCE` macro caused M7 to deadlock
waiting for a CM4 that was never flashed. All three root causes were identified and fixed.
LD1 blinked at a ~1 s rate under a Debug session, confirming the full toolchain.

## Objectives

- Blink LED LD1 on the STM32H757I-EVAL board using the Cortex-M7 core.
- Establish a working STM32CubeMX → STM32CubeIDE 2.0 toolchain for a dual-core STM32H7
  target.
- Identify and document every tool configuration step that a first-time user would
  otherwise need to discover by trial and error.

## Progress

**Stage 1 — MATLAB/Simulink attempt (aborted)**

An existing Simulink model (`Simulation_01_H757_LED_Blink`: Pulse Generator → Digital Port
Write, Port GPIOK) was built and deployed. The build reported success, but the board
produced no output. ELF analysis revealed `text 168 / data 8 / bss 28 / dec 204 / 0xcc`
with linker warning `cannot find entry symbol Reset_Handler; defaulting to 0000800c`,
confirming a stub — not real firmware. During GENERATE CODE, the eclipsec popup appeared:
`"The Eclipsec executable launcher was unable to locate its companion shared library."` This
was identified as the failure preventing STM32CubeMX from generating the IDE scaffold
(startup file, linker scripts, `.cproject`).

An upgrade of STM32CubeMX from 6.12.0 → 6.17.0 and STM32CubeProgrammer from 2.17.0 →
2.22.0, followed by a PC reboot, had no effect. The eclipsec error persisted. Decision
made to pivot to STM32CubeIDE directly to achieve a known-good bare-metal blink before
returning to the Simulink flow.

**Stage 2 — STM32CubeIDE / STM32CubeMX workflow discovery**

STM32CubeIDE 2.0 was opened. `File → New` showed no "STM32 Project" entry; the correct
entry was found at `File → STM32 Project Create/Import`. The wrong project type —
`STM32CubeIDE Empty Project` — was selected first, producing `Project_0_H757I` with
startup and linker files present but no `.ioc`, no HAL library, and no peripheral
configurator. This confirmed that `STM32CubeIDE Empty Project` is not the correct starting
point for a CubeMX-managed project.

It was confirmed that STM32CubeIDE 2.0 removed the integrated CubeMX plugin. The correct
workflow is: standalone STM32CubeMX creates the `.ioc` and generates the full project
scaffold; CubeIDE opens, builds, flashes, and debugs.

**Stage 3 — STM32CubeMX MCU configuration**

Standalone STM32CubeMX 6.17.0 was opened. MCU selector search for `STM32H757XIHx`
returned "0 items (No Match)" due to a conflicting board-name filter (`STM32H757I-EVAL`)
active in a second filter box. After clearing that filter, the search returned 6 results.
Selected Reference `STM32H757XIHx`, Commercial Part No `STM32H757XIH6`, Package `TFBGA
240+25`.

Prompts: "Initialize all peripherals with defaults?" → **No** (to avoid EVAL board
peripheral bloat). "Preconfigure MPU for Cortex-M7 speculative reads?" → **Yes**.

In Pinout & Configuration: left-clicked `PK3` → `GPIO_Output`; right-clicked PK3 →
`Enter User Label` → `LED1`. An RCC warning appeared (`PC9 mapped with SDMMC1_D1` — SDMMC1
conflicting with RCC MCO2 output) and was noted as non-blocking.

Project Manager settings: Name = `Project_0_H757_LED_Blink`, Location =
`E:\Piyus\MATLAB_with_STM32\STMicroelectronics\STM32Cube\STM32CubeMX`, Application
Structure = `Basic`, Toolchain = `STM32CubeIDE`, Generate Under Root = checked.

**Stage 4 — eclipsec root-cause identification and fix**

GENERATE CODE was clicked. The eclipsec popup appeared again, followed by a "Code is
successfully generated" dialog. `Open Folder` was clicked. A `tree /F` inspection revealed
that `.project`, `.cproject`, `Startup/`, `startup_stm32h757xihx.s`,
`STM32H757XIHX_FLASH.ld`, and `STM32H757XIHX_RAM.ld` were all missing — confirming the
eclipsec failure was not cosmetic; the IDE scaffold had not been created.

Root cause identified: the install path for STM32CubeMX was
`C:\Users\NIT\AppData\Local\Programs\MATLAB R2025b\STMicroelectronics\STM32Cube\STM32CubeMX\`.
The Windows Eclipse launcher cannot locate its companion DLL when the path contains a space
(`MATLAB R2025b`).

Fix: reinstalled STM32CubeMX and STM32CubeProgrammer to `C:\STMicroelectronics\STM32Cube\`.
Created new project at `E:\Piyus\STMicroelectronics\STM32Cube\STM32CubeMX_Projects\Project_01_H757_LED_Blink`.
Regenerated code. No eclipsec popup appeared. File tree inspection confirmed the full
scaffold:

```
Project_01_H757_LED_Blink/
├── .project
├── CM7/
│   ├── .cproject
│   ├── .project
│   ├── STM32H757XIHX_FLASH.ld
│   ├── STM32H757XIHX_RAM.ld
│   ├── Src/
│   │   ├── main.c
│   │   ├── syscalls.c
│   │   └── sysmem.c
│   └── Startup/
│       └── startup_stm32h757xihx.s
├── CM4/
│   ├── STM32H757XIHX_FLASH.ld
│   ├── STM32H757XIHX_RAM.ld
│   └── Startup/
│       └── startup_stm32h757xihx.s
├── Common/Src/
│   └── system_stm32h7xx_dualcore_boot_cm4_cm7.c
└── Drivers/STM32H7xx_HAL_Driver/Src/*.c
```

**Stage 5 — first build and flash (GPIO init absent)**

Project opened in STM32CubeIDE 2.0 via `File → Open Projects from File System`. Both
`Project_01_H757_LED_Blink_CM4` and `Project_01_H757_LED_Blink_CM7` appeared in Project
Explorer.

`CM7/Core/Src/main.c` was opened. Toggle code using `LED1_GPIO_Port` / `LED1_Pin` was
added — but mistakenly placed inside `Error_Handler()`'s `while (1)` loop instead of
`main()`'s. Build failed: `error: 'LED1_GPIO_Port' undeclared (first use in this function);
did you mean 'MCO1_GPIO_Port'?` — the user label had not propagated to the generated
`main.h` in this project. Switched to explicit form `HAL_GPIO_TogglePin(GPIOK, GPIO_PIN_3)`.
Build succeeded: `text 7260 / data 16 / bss 1568 / dec 8844 / 0x228c`.

Toggle code moved to `main()`'s `while (1)` inside `/* USER CODE BEGIN 3 */` /
`/* USER CODE END 3 */` markers. Flashed via ST-LINK CN23 (`Run → Run As → STM32 C/C++
Application`): `7.11 KB` at `0x08000000`, `Download verified successfully`, board voltage
`3.27 V`. LED remained OFF.

Inspected `main.c`: no `MX_GPIO_Init` prototype, call, or body. Checked Pin Context
Assignment for PK3 in CubeMX → was "Free" (unassigned). On dual-core targets CubeMX
generates each peripheral's init into the owning core; a "Free" pin generates init in
neither core.

Fix: right-click PK3 → Pin Context Assignment → `Cortex-M7`. Regenerated, refreshed in
CubeIDE. `CM7/Core/Src/main.c` now contained `MX_GPIO_Init` with
`__HAL_RCC_GPIOK_CLK_ENABLE()` and `GPIO_PIN_3 / GPIO_MODE_OUTPUT_PP` configuration.
Built, flashed. LED still OFF.

**Stage 6 — boot-sync trap identification and fix**

Full `main.c` was read again. `#define DUAL_CORE_BOOT_SYNC_SEQUENCE` was active. The
boot-sync block:

```c
/* Boot_Mode_Sequence_1 */
timeout = 0xFFFF;
while((__HAL_RCC_GET_FLAG(RCC_FLAG_D2CKRDY) != RESET) && (timeout-- > 0));
if ( timeout < 0 ) { Error_Handler(); }

/* Boot_Mode_Sequence_2 */
HAL_HSEM_FastTake(HSEM_ID_0);
HAL_HSEM_Release(HSEM_ID_0, 0);
timeout = 0xFFFF;
while((__HAL_RCC_GET_FLAG(RCC_FLAG_D2CKRDY) == RESET) && (timeout-- > 0));
if ( timeout < 0 ) { Error_Handler(); }
```

Only CM7 had been flashed; the CM4 bank was empty. M4 never signalled `RCC_FLAG_D2CKRDY`,
the `timeout = 0xFFFF` loop exhausted, and M7 jumped to `Error_Handler()` — an infinite
loop with `__disable_irq()` — before ever reaching the blink loop.

An attempt to disable the macro with a block comment (`/* #define ... */`) produced build
errors: `warning: "/*" within comment`, `error: #endif without #if (×2)`. Root cause: the
region enclosed by the block comment contained `/* HW semaphore 0*/`; the inner `*/`
closed the comment early, orphaning the `#endif` directives.

Correct fix — line comment on the `#define` only:

```c
//#define DUAL_CORE_BOOT_SYNC_SEQUENCE
```

Rebuilt. `F11` (Debug): CubeIDE halted at `MPU_Config()` (first line of `main()`). `F8`
(Resume): **LD1 started blinking at ~1 s rate. LED blink confirmed working.**

## Decisions

- **Pivot to STM32CubeIDE first, then return to Simulink** — Debugging the MATLAB/Simulink
  flow added too many layers of abstraction. A working bare-metal blink first proves the
  hardware path and tool configuration before adding model-based complexity.

- **MCU selector over board selector for fresh CubeMX projects** — The board selector
  (STM32H757I-EVAL) imports the full EVAL peripheral template (SDMMC, ETH, DSI, LTDC, etc.)
  and adds many pins without context assignment, triggering "pins free and must be assigned
  to a context" warnings throughout. The MCU selector starts from a clean slate.

- **Use `//` (line comment) to disable `#define`, not `/* */` (block comment)** — The
  boot-sync region contains inline block comments ending in `*/`; a wrapping `/* */` cannot
  safely span them. A line comment on the `#define` line alone is the only safe approach.

- **Disable `DUAL_CORE_BOOT_SYNC_SEQUENCE` for single-core development** — When only the
  M7 core is flashed, the boot-sync handshake times out and traps M7 execution in
  `Error_Handler`. This macro must remain disabled for M7-only projects and re-enabled only
  when both cores are programmed.

- **Verify ELF health by size, not by tool messages** — `168 bytes` is diagnostic for a
  missing startup/linker combination. `~7 KB` is a real HAL blink. The "Code is
  successfully generated" dialog and programmer "success" messages are unreliable health
  signals on their own.

- **Verify file tree before opening the IDE after GENERATE CODE** — Required scaffold
  files: `.project` (root), `.cproject` (in CM7 subfolder), `Startup/startup_stm32h757xihx.s`,
  `STM32H757XIHX_FLASH.ld`, `STM32H757XIHX_RAM.ld`. If any are missing, the eclipsec step
  failed and the project is incomplete.

## Problems & Solutions

### P1 — Eclipsec launcher failure producing empty ELF

- **Problem:** Every `GENERATE CODE` run triggered the popup `"The Eclipsec executable
  launcher was unable to locate its companion shared library."` The ELF produced was
  `text 168 / data 8 / bss 28` with linker warning `cannot find entry symbol Reset_Handler;
  defaulting to 0000800c`. Scaffold files (`.project`, `.cproject`, `Startup/`,
  `startup_stm32h757xihx.s`, `STM32H757XIHX_FLASH.ld`, `STM32H757XIHX_RAM.ld`) were never
  created. Error persisted after upgrading CubeMX 6.12.0 → 6.17.0, upgrading
  CubeProgrammer 2.17.0 → 2.22.0, and rebooting the PC.
- **Root Cause:** The Windows Eclipse launcher cannot locate its companion DLL
  (`eclipse_*.dll`) when the path to the launcher executable contains a space. The
  STM32CubeMX install path was
  `C:\Users\NIT\AppData\Local\Programs\MATLAB R2025b\STMicroelectronics\STM32Cube\STM32CubeMX\`,
  which contains a space in `"MATLAB R2025b"`.
- **Solution:** Reinstalled STM32CubeMX and STM32CubeProgrammer to a space-free path
  (`C:\STMicroelectronics\STM32Cube\`). Regenerated code. Eclipsec popup did not appear;
  the full scaffold was created.

### P2 — `MX_GPIO_Init` absent from CM7 `main.c`

- **Problem:** After clean generation from CubeMX (with PK3 configured as `GPIO_Output`
  and labelled `LED1`), `CM7/Core/Src/main.c` contained no `MX_GPIO_Init` prototype, call,
  or body. Build using the `LED1_GPIO_Port` macro failed: `error: 'LED1_GPIO_Port'
  undeclared (first use in this function); did you mean 'MCO1_GPIO_Port'?`. The LED
  remained off even after switching to the explicit `HAL_GPIO_TogglePin(GPIOK, GPIO_PIN_3)`
  form and flashing successfully.
- **Root Cause:** On dual-core STM32H7 targets, CubeMX generates each peripheral's init
  code into the core that "owns" it via its Pin Context Assignment. PK3's context was "Free"
  (unassigned), so `MX_GPIO_Init` was generated into neither CM7 nor CM4.
- **Solution:** Right-clicked PK3 in CubeMX → Pin Context Assignment → `Cortex-M7`.
  Regenerated and refreshed in CubeIDE. `CM7/Core/Src/main.c` then contained the full
  `MX_GPIO_Init` with `__HAL_RCC_GPIOK_CLK_ENABLE()` and `GPIO_PIN_3 / GPIO_MODE_OUTPUT_PP`
  configuration.

### P3 — LED dark after GPIO fix (boot-sync deadlock)

- **Problem:** `MX_GPIO_Init` present and called, ELF `7.11 KB` flashed cleanly to
  `0x08000000`, programmer reported `Download verified successfully`, LED remained OFF.
- **Root Cause:** `#define DUAL_CORE_BOOT_SYNC_SEQUENCE` was active in `main.c`. The macro
  enables a boot sequence that waits for CM4 to signal `RCC_FLAG_D2CKRDY` before M7
  proceeds past clock configuration. Only CM7 was flashed; the CM4 flash bank was empty;
  M4 never asserted `D2CKRDY`; the `timeout = 0xFFFF` loop exhausted; M7 jumped to
  `Error_Handler()` — an infinite loop with `__disable_irq()` — before ever reaching the
  blink loop.
- **Solution:** Disabled the macro using a line comment:
  ```c
  //#define DUAL_CORE_BOOT_SYNC_SEQUENCE
  ```
  The surrounding `#if defined(DUAL_CORE_BOOT_SYNC_SEQUENCE)` / `#endif` blocks remained
  intact and evaluated to false. Rebuilt and reflashed. LED blinked immediately.

### P4 — Build errors from block-comment misuse on boot-sync `#define`

- **Problem:**
  ```
  ../Src/main.c:43:24: warning: "/*" within comment [-Wcomment]
  ../Src/main.c:44:2: error: #endif without #if
  ../Src/main.c:45:2: error: #endif without #if
  ```
- **Root Cause:** The boot-sync region was disabled using a `/* ... */` block comment
  wrapping the `#define` and the surrounding `#if` / `#endif` block. That region contains
  the inline comment `/* HW semaphore 0*/`; the inner `*/` terminated the block comment
  early, leaving the two `#endif` directives without a matching `#if`.
- **Solution:** Use `//` (line comment) on the `#define` line only. The `#if` / `#endif`
  structure remains intact and evaluates to false because `DUAL_CORE_BOOT_SYNC_SEQUENCE` is
  no longer defined.

## Mistakes

- **Upgrading CubeMX to fix the eclipsec error.** CubeMX was upgraded from 6.12.0 to
  6.17.0 on the assumption that the launcher failure was a version bug. The error persisted
  because the root cause was the space in the install path, not the software version.

- **Trusting the "Code is successfully generated" dialog when the eclipsec popup was also
  present.** The HAL driver sources and `.ioc` are written before the eclipse step, so the
  dialog reflects partial success. The IDE scaffold (`.project`, `.cproject`, `Startup/`,
  linker scripts) is what the eclipse step produces. The file tree must be inspected after
  every `GENERATE CODE` run.

- **Selecting "STM32CubeIDE Empty Project" as the project type.** This type creates a
  project with startup and linker files but no `.ioc`, no HAL library, and no peripheral
  configurator. It is not a substitute for a CubeMX-generated project.

- **Placing toggle code inside `Error_Handler()`'s `while (1)` loop instead of `main()`'s.**
  `Error_Handler` executes only on a fault or a deliberate call; normal execution never
  reaches it. This error was caught before flashing; the Outline panel in CubeIDE is the
  correct navigation tool to locate `main()` directly.

- **Using `LED1_GPIO_Port` / `LED1_Pin` macros before the user label had propagated to the
  project's generated `main.h`.** The label was set in the CubeMX `.ioc` but the generated
  header for this specific project revision did not yet include it. Explicit GPIO register
  and pin arguments (`GPIOK`, `GPIO_PIN_3`) are always safe; macro forms require a verified
  generate cycle.

- **Using `/* */` to comment out the `DUAL_CORE_BOOT_SYNC_SEQUENCE` `#define`.** See P4 —
  the inner comment `/* HW semaphore 0*/` closed the block comment early and orphaned the
  `#endif` directives.

## Learnings

- **STM32CubeIDE 2.0 does not include an integrated CubeMX plugin.** The correct workflow
  is: standalone STM32CubeMX creates the `.ioc` and generates the project scaffold;
  STM32CubeIDE 2.0 opens, builds, flashes, and debugs. The `.ioc` file is the handoff
  artifact between the two tools.

- **On dual-core STM32H7xx targets, every used pin must have a Pin Context Assignment
  (Cortex-M7 or Cortex-M4).** Unassigned ("Free") pins produce the CubeMX warning "The
  following pins are free and must be assigned to a context" and generate no peripheral init
  in either core.

- **`Reset_Handler` is defined in the startup assembly file (`startup_stm32h757xihx.s`).**
  If this file is absent from the link (eclipsec failure), `--gc-sections` garbage-collects
  everything, the ELF shrinks to ~168 bytes, and the linker warning `cannot find entry
  symbol Reset_Handler` is emitted. This combination is a certain indicator of a missing
  startup file — not a linker configuration problem.

- **LD1 on the STM32H757I-EVAL is wired directly to PK3 via GPIO.** No I/O expander is
  present on this board. The full LED mapping is: LD1 = PK3, LD2 = PK4, LD3 = PK5,
  LD4 = PK6.

- **The `--gc-sections` linker flag silently discards everything when there is no valid
  entry point.** The resulting ~168-byte ELF programs cleanly and produces a genuine
  "success" from both the build tool and the programmer. The firmware is empty.

- **`DUAL_CORE_BOOT_SYNC_SEQUENCE` deadlocks M7 when CM4 is not flashed.** The macro
  enables a `HAL_HSEM_FastTake` / `HAL_HSEM_Release` boot handshake. M7 waits for M4 to
  assert `RCC_FLAG_D2CKRDY`; with an empty CM4 bank, this wait times out and M7 falls into
  `Error_Handler()` before any user code runs.

- **Debug mode (`F11`) always halts at the first line of `main()`.** Resume (`F8`) releases
  the CPU. Using Debug instead of Run is the most reliable way to confirm that execution
  actually reaches the application loop.

- **CubeMX MCU selector uses the commercial part number, not the reference string.**
  `STM32H757XIH6` is the commercial part number; `STM32H757XIHx` is the reference. Both
  refer to the same device. Searching the reference string may return no results.

- **Two simultaneous filters in the CubeMX MCU selector produce "0 items (No Match)" even
  when the part exists.** The Commercial Part Number field and a secondary keyword filter
  must not both be active at once. Clear all conflicting filters before searching.

- **USER CODE markers survive CubeMX regeneration.** Code outside `/* USER CODE BEGIN x */`
  / `/* USER CODE END x */` is overwritten on regeneration. All application code must be
  placed inside these markers.

## Discoveries

- The "Code is successfully generated" dialog in CubeMX can appear alongside the eclipsec
  error popup. The dialog reflects that HAL sources were written; it does not confirm that
  the IDE scaffold (`.project`, `.cproject`, `Startup/`) was created. Both signals must be
  read together.

- When the board selector is used with STM32H757I-EVAL and "Initialize all peripherals" is
  answered No, many EVAL board pins are left "Free" with no context assignment, creating a
  cascade of warnings on `GENERATE CODE`. The MCU selector avoids this entirely.

- CubeMX commercial part number `STM32H757XIH6` corresponds to reference `STM32H757XIHx`,
  Package `TFBGA 240+25`.

- The `MX_GPIO_Init` function for a given pin is only generated into a core's `main.c` if
  that pin's Pin Context Assignment explicitly names that core. "Free" assigns to no core.

- The ST-LINK `LD12` (COM LED) blinks during a flash operation; this is normal debug
  traffic and does not indicate the application LED behaviour.

- The `RCC_FLAG_D2CKRDY` timeout counter is `0xFFFF` iterations. Whether this is
  sufficient for all boot scenarios at non-HSI clocks is [not tested].

## Technical Insights

- **ELF size as the primary post-build health indicator.** A real STM32H757 M7 LED blink
  with HAL compiles to approximately 7–10 KB. An ELF of ~168 bytes is diagnostic for a
  missing startup/linker combination and must not be flashed.

- **File tree check is the mandatory post-generation verification step.** After
  `GENERATE CODE`, the following files must exist for the project to be usable in
  STM32CubeIDE. If any are missing, generation failed silently:
  ```
  <project_root>/
  ├── .project
  ├── CM7/
  │   ├── .cproject
  │   ├── .project
  │   ├── STM32H757XIHX_FLASH.ld
  │   ├── STM32H757XIHX_RAM.ld
  │   ├── Src/
  │   │   ├── main.c
  │   │   ├── syscalls.c
  │   │   └── sysmem.c
  │   └── Startup/
  │       └── startup_stm32h757xihx.s
  ```

- **Correct GPIOK blink code for LD1 on this board:**
  ```c
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */
    /* USER CODE BEGIN 3 */
    HAL_GPIO_TogglePin(GPIOK, GPIO_PIN_3);
    HAL_Delay(1000);
  }
  /* USER CODE END 3 */
  ```
  Equivalent when `LED1` user label is confirmed present in generated headers:
  `HAL_GPIO_TogglePin(LED1_GPIO_Port, LED1_Pin)`.

- **Boot-sync disable pattern for single-M7 development:**
  ```c
  //#define DUAL_CORE_BOOT_SYNC_SEQUENCE  /* line comment only */

  #if defined(DUAL_CORE_BOOT_SYNC_SEQUENCE)   /* leave intact */
  #ifndef HSEM_ID_0
  #define HSEM_ID_0 (0U)
  #endif
  #endif
  ```
  The `#if` / `#endif` structure must be left intact; only the `#define` line is
  commented out.

- **Why `//` and not `/* */` for this region:** The region below the `#define` contains
  `/* HW semaphore 0*/`. Any enclosing `/* */` comment is terminated by that inner `*/`,
  which orphans the subsequent `#endif` directives and produces a build error.

- **Confirmed board measurements:** Board voltage at time of flash: `3.27 V`. Flash target:
  address `0x08000000`. Device reported as `STM32H7xx`, CPU `Cortex-M7/M4`.

## Design Decisions & Trade-Offs

- **MCU selector vs. board selector in CubeMX** — The board selector (STM32H757I-EVAL)
  loads all onboard peripheral templates (SDMMC, ETH, DSI, LTDC, audio, etc.), which
  leaves many pins in "Free" state if "Initialize peripherals with defaults" is answered No,
  generating the "pins free and must be assigned to a context" cascade. The MCU selector
  starts clean and requires manually mapping only the pins in use (PK3 for LD1). For a
  first project, the MCU selector is significantly less confusing; the board selector is
  acceptable if context assignments are made manually for every pin.

- **Disabling `DUAL_CORE_BOOT_SYNC_SEQUENCE` for single-core development** — This breaks
  the intended M7/M4 synchronisation and means M4 is not initialised. Acceptable for
  M7-only development. Must be re-enabled and CM4 must be flashed with its own firmware
  when both cores are used in a production configuration.

- **Default internal HSI clock for first blink** — No external crystal configuration is
  required. `HAL_Delay` operates correctly at HSI frequency. Sufficient for GPIO and LED;
  not suitable for USB, audio codecs, or peripherals requiring precise clock sources.

## Debugging History

### Confirming the eclipsec path-space hypothesis

- **Symptom:** Eclipsec popup appeared on every `GENERATE CODE` regardless of CubeMX
  version or PC reboot.
- **Hypothesis:** A space in the path to the CubeMX executable prevents the Eclipse
  launcher from finding its companion DLL.
- **Test:** Inspected the STM32CubeMX install path →
  `C:\Users\NIT\AppData\Local\Programs\MATLAB R2025b\STMicroelectronics\STM32Cube\STM32CubeMX\`.
  Space confirmed in `"MATLAB R2025b"`.
- **Resolution:** Reinstalled to `C:\STMicroelectronics\STM32Cube\`. Popup absent on next
  generate; full scaffold present in file tree.

### Confirming missing `MX_GPIO_Init`

- **Symptom:** LED dark; no compile errors; 7 KB ELF; programmer reported success.
- **Test 1:** Inspected `CM7/Core/Src/main.c` for `MX_GPIO_Init` → prototype, call, and
  function body all absent.
- **Test 2:** Checked Pin Context Assignment for PK3 in CubeMX → status was "Free".
- **Resolution:** Assigned PK3 context to `Cortex-M7`, regenerated. `MX_GPIO_Init` with
  `__HAL_RCC_GPIOK_CLK_ENABLE()` and `GPIO_MODE_OUTPUT_PP` for `GPIO_PIN_3` now present in
  CM7 `main.c`.

### Confirming the boot-sync deadlock

- **Symptom:** LED still dark after the GPIO fix. Flash reported success.
- **Test:** Read full `main.c`. Found active `#define DUAL_CORE_BOOT_SYNC_SEQUENCE` and
  two `D2CKRDY`-gated calls to `Error_Handler()`. CM4 flash bank confirmed empty.
- **Confirmation:** Launched with `F11` (Debug). CubeIDE halted at `MPU_Config()` (first
  line of `main()`). Pressed `F8` (Resume). LED blinked immediately, confirming M7 was
  reaching the blink loop once the boot-sync trap was bypassed.
- **Resolution:** `//#define DUAL_CORE_BOOT_SYNC_SEQUENCE`. Rebuild and reflash.

## References

- STM32H757I-EVAL User Manual (UM2411) — LED pin mapping: LD1 = PK3, LD2 = PK4, LD3 = PK5,
  LD4 = PK6, all direct GPIO, no I/O expander.
- STMicroelectronics STM32CubeIDE 2.0 Release Notes — removal of the integrated CubeMX
  plug-in.
- ST Community thread: eclipsec "unable to locate companion shared library" — space-in-path
  root cause and reinstall resolution.
- STM32Cube firmware pack `STM32Cube_FW_H7_V1.13.0` — HAL driver version used in code
  generation.

## Future Work

- Verify LD2, LD3, LD4 (PK4, PK5, PK6) using the same `HAL_GPIO_TogglePin` / `HAL_Delay`
  pattern confirmed for LD1.
- Read the user button (PC13 on this board) as the first GPIO input exercise.
- Flash both CM7 and CM4 firmware, re-enable `DUAL_CORE_BOOT_SYNC_SEQUENCE`, and verify
  the correct dual-core boot handshake completes without timeout.
- Investigate the `RCC_FLAG_D2CKRDY` timeout threshold — `timeout = 0xFFFF` iterations may
  be too short for some boot scenarios or non-HSI clock configurations. [not tested]
- Determine the exact cycle count of the `timeout = 0xFFFF` loop at the default HSI clock
  frequency. [not stated]
- Confirm whether the SDMMC1 / RCC PC9 conflict warning affects any boot or peripheral
  initialisation behaviour. [not investigated]
- Return to the MATLAB/Simulink flow (`Simulation_01_H757_LED_Blink`) now that the
  hardware path and CubeMX → CubeIDE toolchain are validated.
