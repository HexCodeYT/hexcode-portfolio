import { checkAllServices } from "../lib/uptime-monitor";

async function main() {
  const results = await checkAllServices();

  for (const result of results) {
    console.log(
      `${result.name}: ${result.status}${
        result.latency === null ? "" : ` ${result.latency}ms`
      }`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
