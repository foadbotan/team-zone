# Team Zone

Team Zone is a useful tool for managing time zone differences in remote teams. It simplifies scheduling meetings, tracking deadlines and enhances communication efficiency. Eliminate time zone confusion and improve productivity with Team Zone.

## Components

1. A list of team members

   - The list will be offset list by time zone and color coded (like a Gantt chart)

2. A range slider to select a time range

   - The time for each team member will be highlighted in the list

3. A form to input other info about the meeting

## State

UI state will be stored in the URL. This will allow users to share a link to a specific view timezone view without signing up.

## Data

I might fetch time zone data from WorldTimeAPI. I will also need to store the user's data in a database.
I'll use the Luxon or Date-fns to interact with the dates and times.
Supabase will be used for the database.

## Routes

- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/teams` - Dashboard page
- `/teams/:id` - Dashboard page for a specific team
- `/teams/:id/meetings` - Meeting page for all meetings for a specific team
- `/teams/:id/meetings/:id` - Meeting page for a specific meeting for a specific team
- `/users/:id` - User profile page
