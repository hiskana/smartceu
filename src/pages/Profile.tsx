import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div className="container max-w-3xl py-12 space-y-6">
      <h1 className="text-4xl font-semibold tracking-tight">
        Your learning space.
      </h1>
      <p>
        There’s no account to set up for the free preview. Your progress stays
        in this browser.
      </p>
      <div className="studio-card p-6 space-y-3">
        <h2 className="text-xl font-semibold">Simple for now.</h2>
        <p className="text-muted-foreground">
          Sign-in and verified learner profiles will be available when
          qualifying CE courses are ready. You don’t need to enter your license
          number for this preview.
        </p>
      </div>
      <Link className="btn-premium inline-block" to="/dashboard">
        Go to my learning
      </Link>
    </div>
  );
}
