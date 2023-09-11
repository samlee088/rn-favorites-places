import PlaceForm from "../components/Places/PlaceForm";
import {
  deleteAndRecreateTable,
  insertPlace,
  logColumnNames,
} from "../utils/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    // await deleteAndRecreateTable();
    await logColumnNames();
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
