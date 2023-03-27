import { program } from 'commander'

program
  .requiredOption('-p, --port', 'Port needed for the web application')
  .parse(process.argv)

export default program
