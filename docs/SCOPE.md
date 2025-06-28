# MVP SCOPE

## Core Features

### Passenger

- [ ] Search available trips
- [ ] Reserve seats (online/offline)
- [ ] Request home pickup (10km radius)
- [ ] Receive digital ticket

### Driver

- [ ] Register vehicle (admin approval required)
- [ ] Declare trip schedules
- [ ] Manage seat availability
- [ ] Accept home pickup requests

### Station Admin

- [ ] Approve/reject drivers
- [ ] Override bookings
- [ ] Mark station offline
- [ ] Resolve booking conflicts

## Technical Scope

- Offline-first PWA
- Real-time seat map
- SMS fallback system
- Priority queuing:
  1. Physical tickets
  2. Admin bookings
  3. Online reservations

## Out of Scope (V2)

- Digital payments
- Return tickets
- Loyalty programs
