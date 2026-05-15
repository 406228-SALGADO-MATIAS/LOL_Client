# 🎮 LOL Client - Simulator

![Client Preview](docs/images/lolclient.jpg)

---

## 📑 Index

1. [🚀 Demo](#-demo)

2. [🎮 Match Simulation](#-match-simulation)
   - [⚙️ Matchmaking](#️-matchmaking)
   - [🎯 Game Modes](#-game-modes)
   - [🎲 Automatic Generation](#-automatic-generation)
   - [🧠 Itemization and Playstyles](#-itemization-and-playstyles)
   - [📊 Statistics Distribution](#-statistics-distribution)

3. [👤 User Management](#-user-management)

4. [💰 Progression and Reward System](#-progression-and-reward-system)
   - [🏆 Competitive Progression](#-competitive-progression)
   - [🎁 Post-Match Rewards](#-post-match-rewards)
   - [💎 Economy and Inventory](#-economy-and-inventory)

5. [🖼️ Architecture and Data Model](#️-architecture-and-data-model)
   - [🌍 Servers](#-servers)
   - [👤 Users](#-users)
   - [🛡️ Champions](#️-champions)
   - [🧥 Skins](#-skins)
   - [💠 Profile Icons](#-profile-icons)
   - [🎒 Match Items](#-match-items)
   - [🔁 User Resource Relationships](#-user-resource-relationships)
   - [🏆 Match System](#-match-system)

6. [🚀 Technologies Used](#-technologies-used)

7. [🗂️ Project Structure](#️-project-structure)

---

📄 [Spanish version](README.md)

This project is a simulation of the internal behavior of a League of Legends client, focused on the business logic responsible for managing users, servers, champions, inventories, and matches.

In addition, it includes a frontend application that integrates and exposes all this logic through an interactive interface, allowing users to register, log in, generate matches, manage their inventory, and visualize statistics, creating a complete functional environment where all systems can be explored and interacted with in real time.

---

## 🚀 Demo

### 🌐 [LOL Client Frontend](https://lol-client-front.onrender.com/)

### ⚙️ [LOL Client Backend](https://lol-client-back.onrender.com/) (Endpoints)

---

## 🎮 Match Simulation

![Play Menu - Match Generation](docs/images/play.png)

The system automatically generates matches using available users within a server, applying matchmaking, champion selection, and statistics distribution rules depending on the selected game mode.

### ⚙️ Matchmaking

The match creation process follows a sequential logic:

- Users are searched within the same server
- In **Ranked** matches, players are filtered by equal or similar rank
- In **Normal** matches, rank restrictions are not applied
- Only users with at least one available champion are considered
- Players are assigned to roles according to required team positions

The system also supports role and champion preselection for the main user, while the remaining players are assigned automatically.

---

### 🎯 Game Modes

#### Ranked

- Rank-based matchmaking
- Role selection
- Champion selection from the user's inventory
- Skin selection associated with the chosen champion

#### Normal

- Matchmaking without rank restrictions
- Role selection
- Champion selection from the user's inventory
- Associated skin selection

#### ARAM

- No role assignment
- Champion selection from 3 random options available in the user's inventory
- Skin selection for the chosen champion

---

### 🎲 Automatic Generation

All game modes support automatic match generation, where the system selects:

- Available champions from the user's inventory
- Associated skins
- Roles (when applicable)

---

### 🧠 Itemization and Playstyles

Each champion has one or more playstyles. Based on this:

- Itemization is generated automatically
- The champion's primary playstyle is prioritized when multiple options exist
- Assigned items remain consistent with the selected playstyle

### 📊 Statistics Distribution

Player statistics are generated according to the assigned role during the match, ensuring coherent simulated performance for each position.

---

## 👤 User Management

![Profile Menu - User Stats](docs/images/user.png)

Users represent the core of the system, since every functionality is built and connected around them, concentrating all the information required to participate and progress within the game environment.

Based on this structure, several systems define user progression:

- 💰 Resources: users own currencies such as Blue Essence and Riot Points, used to acquire content
- 🏆 Competitive system: each user has a rank and LP (League Points) progression that reflects match performance
- 🎒 Persistent state: inventory, progression, and match history are dynamically updated according to user activity

Additionally, the profile section allows users to visualize detailed match history and statistics, consult competitive rankings, and search for other users using advanced combined filters.

These features transform the user into an active entity within the gameplay loop, connecting match simulation with progression and customization.

---

## 💰 Progression and Reward System

![Loot Menu - Rewards for user](docs/images/loot.png)

The system incorporates competitive progression mechanics and reward systems inspired by the League of Legends gameplay experience, directly connecting user performance with inventory expansion and gameplay possibilities.

### 🏆 Competitive Progression

Ranked matches include a rank and LP (League Points) system where users progress linearly through different competitive tiers.

Player rank acts as the primary matchmaking criterion in ranked games, aiming to create balanced matches between users of similar skill level.

---

### 🎁 Post-Match Rewards

Rewards are obtained through the Loot section via unlockable chests earned after matches:

- In Normal and ARAM matches, rewards are granted only after victories
- In Ranked matches, users receive rewards both when losing and winning, although victories provide greater rewards

Chests may contain:

- Champions
- Skins
- Profile icons

---

### 💎 Economy and Inventory

The system uses different resources to unlock content:

- Blue Essence: used to obtain champions and profile icons
- Orange Essence: used to unlock skins

Inventory expansion directly impacts match diversity by increasing the number of champions available for selection and simulation.

Additionally, each champion contains dynamic statistics and variable win rates, which are used as part of the logic that determines victory probabilities in simulated matches.

---

## 🖼️ Architecture and Data Model

This backend simulates the data management of a League of Legends client, organizing information by servers and allowing operations over entities such as users, champions, skins, profile icons, matches, and more. Functionalities are divided into several main modules:

The following diagram illustrates the system entities and relationships:

![Database Diagram](docs/images/LoL.drawio.png)

### 🌍 Servers

- Each server represents a region (for example: LAS, NA, EUW)
- Everything belonging to a server (users, matches, inventories, etc.) is exclusive to that environment. No information is shared between servers
- Base filter for most queries

---

### 👤 Users

- Queries by:
  - ID
  - Registration date
  - League rank
  - Win rate (ARAM, Normal, Ranked)
  - Number of matches played
  - Rank tier + server
- Advanced combined filters
- Partial CRUD operations with validations (delete pending)

---

### 🛡️ Champions

- Queries by:
  - Name (contains)
  - Difficulty
  - Role 1 / Role 2
  - Playstyle 1 / Playstyle 2
  - Release date
  - Price
  - Win rate
  - Owned and non-owned champions
- CRUD operations with validations (create/edit implemented, delete pending)
- Cross filters by role and playstyle

---

### 🧥 Skins

- Queries by:
  - ID, name, and price
  - Associated champion
  - Skins available for purchase by a user
  - Owned and non-owned skins
- Full CRUD operations with validations

---

### 💠 Profile Icons

- Queries by:
  - ID and name
  - Icons owned or not owned by a user (in progress)
- Full CRUD operations

---

### 🎒 Match Items

- Queries by:
  - Type 1 / Type 2
  - Name (including partial matches)
  - ID
- Full CRUD operations with validations

---

### 🔁 User Resource Relationships

- **User x Champion**
  - Queries by ID, user, champion, or combinations
  - Full CRUD operations with validations

- **User x Skin**
  - Same structure adapted for skins
  - Full CRUD operations with validations

- **User x Profile Icon**
  - Same structure for managing user-unlocked profile icons
  - Full CRUD operations with validations

---

### 🏆 Match System

The backend implements the core match simulation logic, including user matchmaking, role assignment, champion selection, and automatic itemization based on champion playstyles.

Match generation is segmented into different game modes (Ranked, Normal, and ARAM), each with its own matchmaking, selection, and statistics distribution rules.

All this logic is directly integrated with the user, inventory, progression, and reward systems of the project.

With this architecture, the system accurately emulates how the League of Legends client organizes and presents information for each player within their region, facilitating complex filtering and digital content management (skins, champions, profile icons).

---

## 🚀 Technologies Used

- Java 17
- Spring Boot
- Maven
- JPA / Hibernate
- Lombok
- MapStruct
- Swagger / OpenAPI
- Docker
- JavaScript
- HTML
- CSS3
- H2 In-Memory Database
- IntelliJ IDEA (`.idea` structure)

---

## 🗂️ Project Structure

```plaintext
LOL_Client/
├── Back/                         # Spring Boot backend
│   ├── src/                      # Main source code
│   ├── pom.xml                   # Maven configuration
│   ├── dbdiagram/                # Database diagrams and data model
│   └── docs/                     # Backend resources and documentation
│
├── Front/                        # Frontend application
│   ├── css/                      # Interface styling
│   ├── javascript/               # Frontend logic and interaction
│   └── pages/                    # Application pages and sections
│
├── docs/
│   └── images/                   # README images
│
├── README.md                     # Main documentation
├── README.en.md                  # English version
└── .idea/                        # IntelliJ IDEA configuration
```
