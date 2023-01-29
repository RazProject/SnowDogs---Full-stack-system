import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import VacationModel from "../../../../Models/VacationModel";
import notifyService from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function FollowersGraph(): JSX.Element {

    useVerifyAdmin();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                display: false,
            },
            title: {
                display: true,
                text: "Vacation Followers Chart",
                color: "white"
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            }
        }
    };

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    vacationsService
        .getAllVacations()
        .then(vacations => setVacations(vacations))
        .catch((err) => notifyService.error(err));

    const data = {
        labels: vacations.filter(v => v.followersCount > 0).map(v => "Vacation: " + v.vacationId),
        datasets: [
            {
                label: "Followers",
                data: vacations.map((v: VacationModel) => v.followersCount),
                backgroundColor: "white",
            }
        ],
    };



    return <Bar options={options} data={data} />;
}

export default FollowersGraph;