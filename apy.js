import Compound from '@compound-finance/compound-js';

const provider = 'https://speedy-nodes-nyc.moralis.io/453da2a22cc39051bdeaaeb2/eth/mainnet';

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);

const cTokenDecimals = 8;
const blocksPerDay = 4 * 60 * 24;
const daysPerYear = 365;
const ethMentissa = Math.pow(10, 18);

async function calculateSupplyApy(cToken) {
    const supplyRatePerBlock = await Compound.eth.read(
        cToken,
        'function supplyRatePerBlock() returns(uint)',
        [],
        { provider }
    );

    return 100 * (Math.pow((supplyRatePerBlock / ethMentissa * blocksPerDay) + 1, daysPerYear - 1) - 1)
}