export default function SidebarLevels() {
  return (
    <div className="card bg-base-100 p-4 shadow-md space-y-3">
      <h2 className="font-bold">Niveaux</h2>

      {["L1", "L2", "L3", "Master 1", "Terminale"].map((level) => (
        <button key={level} className="btn btn-ghost justify-start">
          {level}
        </button>
      ))}
    </div>
  );
}