import { ProtectedRoute } from "./guard/ProtectedRoute";
import { RoleProtectedRoute } from "./guard/RoleBasedRoute";
import { RootRedirect } from "./guard/RootRedirect";
import { NavBar } from "./layout/NavBar";
import { FormButton } from "./ui/FormButton";
import { FormInput } from "./ui/FormInput";
import { FormSelect } from "./ui/FormSelect";
import { DataTable } from "./ui/DataTable";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { Pagination } from "./ui/Pagination";
import { CnicSearchForm } from "./visitor/CnicSearchForm";
import { DocumentSlotUploader } from "./visitor/DocumentSlotUploader";
import { OcrExtractPanel } from "./visitor/OcrExtractPanel";

export {
    ProtectedRoute,
    RoleProtectedRoute,
    NavBar,
    FormButton,
    FormInput,
    FormSelect,
    DataTable,
    Section,
    Button,
    Pagination,
    CnicSearchForm,
    DocumentSlotUploader,
    OcrExtractPanel,
    RootRedirect
}