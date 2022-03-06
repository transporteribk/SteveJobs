import { Utilities } from "../../utilities"
import { process } from "./process.js"

const execute = async function (job, callback) {
	const jobDoc = Utilities.helpers.getJob(job, {
		allow: ["pending", "failure"],
		message: "Job is not valid or not found, or is already resolved:"
	});

	//console.log(`Jobs.execute`, jobDoc.name, jobDoc._id, jobDoc.due)

	if (typeof jobDoc === "object") {
		if (typeof Utilities.registry.data[jobDoc.name]) {			
			const result = await process(jobDoc, callback);
			return result;
		} else {
			Utilities.logger("Jobs: Job not found in registry: " + jobDoc.name);
			return false;
		}
	}
}

export { execute }