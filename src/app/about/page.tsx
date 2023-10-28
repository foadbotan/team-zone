'use client';

export default function page() {
  return (
    <main className="container prose prose-stone space-y-12 py-12 lg:prose-xl">
      <button
        type="button"
        onClick={() => window.history.back()}
        className=" cursor-pointer text-sm font-medium text-neutral-500 underline hover:text-neutral-700"
      >
        ← Back
      </button>
      <h1 className="text-center tracking-tight">About Team Zones</h1>
      <p>
        Team Zones is a free tool designed to simplify scheduling and enhance coordination
        for remote teams across different time zones. It&apos;s a perfect solution for
        global teams looking to improve their productivity and communication efficiency.
      </p>
      <h2>Features</h2>
      <ol>
        <li>
          <strong>Team Members List:</strong> Team Zones provides a list of team members,
          offset by time zone and color-coded like a Gantt chart. This feature allows you
          to quickly visualize the time zones of your team members.
        </li>
        <li>
          <strong>Time Range Selection:</strong> A range slider is available to select a
          specific time range. The corresponding time for each team member is highlighted
          in the list, making it easy to find a suitable meeting time for everyone.
        </li>
        <li>
          <strong>Meeting Information Form: </strong>You can input additional information
          about the meeting, such as the agenda, duration, and participants.
        </li>
        <li>
          <strong>State Persistence:</strong> The UI state is stored in the URL, allowing
          you to share a link to a specific timezone view without the need for signing up
          or logging in. Technology Stack
        </li>
      </ol>
      <h2>Technology Stack</h2>
      <p>Team Zones is built using the following technologies:</p>
      <ul>
        <li>
          <strong>Next.js:</strong> A popular React framework for building web
          applications.
        </li>
        <li>
          <strong>Tailwind CSS:</strong> A utility-first CSS framework for rapidly
          building custom user interfaces.
        </li>
        <li>
          <strong>Zod:</strong> A TypeScript-first schema declaration and validation
          library.
        </li>
        <li>
          <strong>Luxon:</strong> A powerful library for working with dates and times in
          JavaScript.
        </li>
        <li>
          <strong>useUrl:</strong> My custom Next.js hook that replaces useState and
          stores React state in the URL for persistence and sharing.
        </li>
      </ul>
      <h2 id="contact">About the Creator</h2>
      <p>
        Team Zones is created by Foad Botan, a passionate developer dedicated to creating
        tools that enhance productivity and efficiency. You can connect with Foad on{' '}
        <a href="https://github.com/foadbotan">GitHub</a>,{' '}
        <a href="https://www.linkedin.com/in/foadbotan">LinkedIn</a>, and{' '}
        <a href="https://twitter.com/FoadBotan">Twitter</a>.
      </p>
    </main>
  );
}
