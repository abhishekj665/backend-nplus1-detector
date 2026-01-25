import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import TimelineIcon from "@mui/icons-material/Timeline";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function WelcomePage({ username }) {
  const { user } = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  if (user === null) {
    setTimeout(() => {
      navigate("/auth/login");
      toast.error("Please login to continue");
    }, 800);

    return;
  }

  return (
    <div className="h-full  bg-[#f8f9fb] flex items-center justify-center ">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Welcome to Opti-Core {username}
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Opti-Core is a backend code optimization platform designed to
            analyze, profile, and improve the performance, reliability, and
            efficiency of server-side applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <BoltIcon className="text-indigo-600" />
            <h3 className="mt-3 font-semibold text-gray-900">
              Performance Analysis
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Detect slow queries, heavy functions, and resource bottlenecks in
              your backend.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 ">
            <CodeIcon className="text-indigo-600" />
            <h3 className="mt-3 font-semibold text-gray-900">
              Code Optimization
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Get structured insights and recommendations to improve code
              quality and speed.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <StorageIcon className="text-indigo-600" />
            <h3 className="mt-3 font-semibold text-gray-900">
              System Monitoring
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Track jobs, executions, and backend workloads from a single
              dashboard.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 ">
            <TimelineIcon className="text-indigo-600" />
            <h3 className="mt-3 font-semibold text-gray-900">
              Actionable Reports
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Visual reports to understand trends, regressions, and optimization
              impact.
            </p>
          </div>
        </div>

        <div className="text-center mt-14 text-sm text-gray-500 italic">
          Built for developers who care about performance, scalability, and
          clean backend architecture.
        </div>
      </div>
    </div>
  );
}
