# MVP SCOPE

## Core Features (MVP)

### Passenger

-   [ ] Search available trips
-   [ ] Reserve seats (online/offline)
-   [ ] Request home pickup (10km radius)
-   [ ] Receive digital ticket

### Driver

-   [ ] Register vehicle (admin approval required)
-   [ ] Declare trip schedules
-   [ ] Manage seat availability
-   [ ] Accept home pickup requests

### Station Admin

-   [ ] Approve/reject drivers
-   [ ] Override bookings
-   [ ] Mark station offline
-   [ ] Resolve booking conflicts

---

## User Stories (Examples)

-   **Passenger**: "As a passenger, I want to search for available trips and reserve a seat so I can travel easily."
-   **Driver**: "As a driver, I want to declare my trip schedule and manage seat availability."
-   **Station Admin**: "As an admin, I want to approve drivers and resolve booking conflicts."

---

## Acceptance Criteria (Sample)

-   Passengers can only see trips with available seats in real time.
-   Drivers cannot declare overlapping trips.
-   Admins can override any booking.

---

## Technical Scope

-   Offline-first PWA (Progressive Web App)
-   Real-time seat map (Socket.IO)
-   SMS fallback system (Twilio)
-   Priority queuing:
    1. Physical tickets
    2. Admin bookings
    3. Online reservations

---

## Glossary

-   **Louage**: Shared taxi system common in North Africa.
-   **Station Admin**: User with permissions to manage drivers, bookings, and station status.
-   **Offline-first**: App works without internet and syncs when online.

---

## Out of Scope (V2+)

-   Digital payments
-   Return tickets
-   Loyalty programs

---

## Notes

-   MVP = Minimum Viable Product. Only features above are required for first release.
-   See `TECH_STACK.md` for technology choices and rationale.
