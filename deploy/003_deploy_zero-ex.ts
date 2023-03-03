import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const {deployments, getNamedAccounts, ethers} = hre;
	const {deploy, get} = deployments;

	const migratorAddress = await get('FullMigration');
	const migrator = await ethers.getContractAt('FullMigration', migratorAddress.address);

	const {deployer} = await getNamedAccounts();

	await deploy('ZeroEx', {
		from: deployer,
		log: true,
		args: [await migrator.getBootstrapper()],
		autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
	});
};
export default func;
func.tags = ['SimpleERC20'];