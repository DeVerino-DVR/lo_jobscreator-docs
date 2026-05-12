# Concepts

A short tour of the vocabulary the panel uses.

## Job

A profession a character can be assigned to. Stored on the VORP character (`job` + `jobGrade`). A job has:

- A **technical name** (lowercase, used in code) and a **label** (shown to players).
- A **type** (`leo`, `medic`, `fire`, `gouv`, etc.) used by dispatch filtering and "how many cops online?" counters.
- **Grades** — ordered list (0, 1, 2…). Each grade has a name, a salary, and an "is boss" flag.
- **Regions covered** — which towns / districts this job dispatches to.
- **Interactions** — points in the world that only members of this job can use (or that everyone sees but only this job actually works on).

## Gang

Same idea as a job, stored separately on the character (`gang` + `gangGrade`). A player can be in a job AND a gang at the same time.

## Public interaction

A point in the world that **anyone** can use, with no job restriction. Mailboxes, payphones, public stables, etc.

## Interaction

The unit of "thing players do at a place". Every interaction has:

- A **type** — `stash`, `shop`, `farm`, `sell`, `process`, `craft`, `duty`, `bossaction`, `vehicle_garage`, `stable`, `delivery_point`, `phone`, `teleport`, `clothing_store`, `clothing_wardrobe`. See [Interaction types](/reference/interaction-types).
- A **position** in the world.
- Optional **visuals** — a floating prompt, an `ox_target` zone, a blip, a ped, a prop, a 3D marker.
- A **scope** — attached to a job, a gang, or "public".

## Item

A `vorp_inventory` item, created from the Items tab. Has a name, label, weight, limit, and optionally an "usable" effect (consume to gain hunger / thirst / health, play an animation, apply a screen FX, become drunk…).

## Duty

A simple on/off state per player per job. Created by `duty` interactions. Paychecks only drop while a player is on duty.

## Dispatch (witness)

The built-in alert system. When something happens (called from your scripts or from a `witness` interaction), every online player whose job type matches the alert's filter — and whose job covers the region — gets a notification with a GPS waypoint.

## Personal action

A button in the per-player action menu (default: F7). Configured in **Server config → Personal actions**. Each action targets either the player themselves, another player, or a vehicle, and fires a named hook so you can attach your own logic.
