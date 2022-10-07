import {
  useRefHistory,
  useDebouncedRefHistory,
  useLocalStorage,
  useStorage,
} from "@vueuse/core";

export default () => {
  const route = useRoute();
  const routeName = route.params.name;
  const data = useLocalStorage(routeName, {});

  const currentEditorNav = useState("currentEditorNav", () => "general");
  const previewImage = useState("previewImage", () => "");
  const imageModal = useState("imageModal", () => false);

  const isDarkMode = useState("darkMode", () => routeName);
  return {
    isDarkMode,
    routeName,
    data,
    currentEditorNav,
    previewImage,
    imageModal,
  };
};
