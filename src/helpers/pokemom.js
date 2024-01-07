import { getEvolutionsData } from "../services/pokemonServices.js";

const formatStats = (stats) => {
  const nameTypes = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };
  const newstats = stats.map((stat) => ({
    name: nameTypes[stat.stat.name],
    base_stat: stat.base_stat,
  }));

  newstats.push({
    name: "TOT",
    base_stat: stats.reduce((acc, stat) => acc + stat.base_stat, 0),
  });
  return newstats;
};

const getImages = (sprites) => {
  return (
    sprites.versions["generation-v"]["black-white"].animated.front_default ??
    sprites.versions["generation-v"]["black-white"].front_default
  );
};

const formatTypes = (types) => types.map((type) => type.type.name);

const formatAbilities = (abilitis) =>
  abilitis.map((ability) => ability.ability.name);

const getPokemonDescription = (pokemonSpecie) =>
  pokemonSpecie.flavor_text_entries[1].flavor_text;

const getEvolutions = async (evolutionInfo) => {
  const evolutions = [];
  let evolutionData = evolutionInfo.chain;

  do {
    const evoDetails = evolutionData["evolution_details"][0];

    evolutions.push({
      name: evolutionData.species.name,
      min_level: evoDetails?.min_level ?? 1,
    });

    evolutionData = evolutionData.evolves_to[0];
  } while (evolutionData);

  const promises = getEvolutionsData(evolutions);

  try {
    const responses = await Promise.allSettled(promises);
    assignInfoToEvolutions(responses, evolutions);
  } catch (err) {
    console.log(err);
  }

  return evolutions;
};

const assignInfoToEvolutions = (responses, evolutions) => {
  responses.forEach((response, index) => {
    if (response.status === "fulfilled") {
      evolutions[index].image =
        response.value.data.sprites.versions["generation-v"][
          "black-white"
        ].front_default;
      evolutions[index].pokemonInfo = response.value.data;
    }
  });
};

export {
  formatStats,
  getImages,
  formatTypes,
  formatAbilities,
  getPokemonDescription,
  getEvolutions,
};
