import { Link } from "react-router-dom";
import { ArrowUpRight, BrainCircuit, HeartPulse } from "lucide-react";

const paths = [
  {
    id: "pt",
    title: "Psychiatric Technician",
    icon: BrainCircuit,
    theme: "profession-pt",
    photo: "portrait-left",
  },
  {
    id: "lvn",
    title: "Vocational Nurse",
    icon: HeartPulse,
    theme: "profession-lvn",
    photo: "portrait-right",
  },
];

export default function Index() {
  return (
    <div className="profession-home">
      <header className="profession-welcome">
        <p>California PT & LVN</p>
        <h1>Your next chapter.</h1>
        <span>Choose your profession.</span>
      </header>
      <div className="profession-tiles">
        {paths.map(({ id, title, icon: Icon, theme, photo }) => (
          <Link
            key={id}
            to={`/catalog?profession=${id}`}
            className={`profession-tile ${theme}`}
            aria-label={`${title} — explore learning`}
          >
            <div className={`profession-portrait ${photo}`} aria-hidden="true">
              <img
                src="/images/care-team.png"
                alt=""
                width="1536"
                height="1024"
              />
            </div>
            <div className="profession-tile-content">
              <span className="profession-icon">
                <Icon size={30} strokeWidth={1.6} />
              </span>
              <h2>{id === "lvn" ? "LVN" : title}</h2>
              {id === "lvn" && (
                <span className="profession-subtitle">Vocational Nurse</span>
              )}
              <span className="profession-tile-link">
                Explore learning <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <p className="profession-preview">
        Free learning preview · No CE credit yet
      </p>
    </div>
  );
}
