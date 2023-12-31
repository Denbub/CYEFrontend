import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { serviceTypes } from "constant";
import { routes } from "routes";

import { getCompany } from "selectors";
import {
    addService,
    clearEventTypes,
    clearServiceAdd,
    fetchCategories,
    fetchCompanyServices,
    getCategories,
    getServiceInfo,
    updateCompany,
    updateService
} from "slices";

import Loader from "components/Loader";
import Stepper from "components/Stepper";

import { MainWrapper } from "elements/Elements.js";
import Container from "elements/v2/Container";

import Address from "./Address";
import Categories from "./Categories";
import CategoryAttributes from "./CategoryAttributes";
import CompanyDescription from "./CompanyDescription";
import EventTypes from "./EventTypes";
import FinalStep from "./FinalStep";
import Gallery from "./Gallery";
import ServiceDescription from "./ServiceDescription";

import {
    Button,
    ButtonHolder,
    Form,
    MainServiceHolder,
    MainServiceWrapper
} from "./AddServiceForm.style";

const formSteps = {
	category: 0,
	serviceAttributes: 1,
	companyDescription: 2,
	serviceDescription: 3,
	eventTypes: 4,
	imageGallery: 5,
	address: 6,
	final: 7
};

const ActiveStep = ({
	activeStep,
	categories,
	formik,
	servicesList,
	templates,
	mainServiceId,
	categoryName,
	setCategoryName,
	hasMainService
}) => {
	switch (activeStep) {
		case 0:
			return (
				<Categories
					categories={categories}
					formik={formik}
					servicesList={servicesList}
					mainServiceId={mainServiceId}
					setCategoryName={setCategoryName}
					hasMainService={hasMainService}
				/>
			);
		case 1:
			return <CategoryAttributes templates={templates} formik={formik} />;
		case 2:
			return <CompanyDescription formik={formik} categoryName={categoryName} />;
		case 3:
			return (
				<ServiceDescription
					formik={formik}
					categoryName={categoryName}
					required={hasMainService}
				/>
			);
		case 4:
			return <EventTypes />;
		case 5:
			return <Gallery />;
		case 6:
			return <Address formik={formik} />;
		case 7:
			return <FinalStep />;
	}
};

const AddServiceForm = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [openService, setOpenService] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const router = useRouter();
	const [enabledNextStep, setEnabledNextStep] = useState(true);

	const { categories, servicesList, templates, loading } = useSelector(getCategories);
	const { serviceId, mainServiceId, subService } = useSelector(getServiceInfo);

	const {
		id: companyId,
		has_main_service: hasMainService,
		loading: companyLoading,
		location
	} = useSelector(getCompany);

	const dispatch = useDispatch();
	const { t } = useTranslation();

	const formik = useFormik({
		initialValues: {
			category: null,
			noneMainService: mainServiceId === undefined && subService,
			service: null,
			serviceAttributes: {},
			serviceDescription: "",
			name: "",
			companyDescrition: "",
			serviceName: "",
			radius: 0,
			address: "",
			location
		},
		validationSchema: Yup.object({
			name: Yup.string().required(t("errors.required.text")),
			shortTitle: Yup.string().required(t("errors.required.text")),
			category: Yup.string().required(t("errors.required.text")),
			radius: Yup.number().integer(t("errors.noDecimal"))
		})
	});

	const checkEnabledNextStep = () => {
		switch (activeStep) {
			case 0:
				if (
					formik.values.noneMainService ||
					(formik.values.category !== null && formik.values.service)
				) {
					return true;
				}
				return false;

			case 2:
				if (!formik.values.noneMainService) {
					return formik.values.name !== "";
				}
				return true;
			case 3:
				return formik.values.serviceName !== "";
			default:
				return true;
		}
	};
	const onSubmit = () => {
		const {
			category,
			service,
			serviceAttributes,
			name,
			companyDescription,
			serviceName,
			serviceDescription,
			noneMainService
		} = formik.values;

		let type = serviceTypes.SUB_SERVICE;

		if (hasMainService && category && mainServiceId === null && subService === null) {
			type = serviceTypes.MAIN;
		}

		const requestData = {
			attributes_values: {
				...serviceAttributes
			},
			name,
			description: companyDescription,
			type,

			short_title: serviceName,
			short_description: serviceDescription,
			company: companyId,
			service_template: category ? service.value : "",
			serviceAttributes: []
		};

		if (noneMainService) {
			dispatch(updateCompany({ ...requestData, has_main_service: false }));
		} else {
			dispatch(addService(requestData));
		}
	};

	const onNextClick = () => {
		if (activeStep === formSteps.final) {
			formik.resetForm();
			dispatch(fetchCompanyServices(companyId));
			dispatch(fetchCategories());
			setActiveStep(0);
		} else if (checkEnabledNextStep()) {
			if (activeStep === formSteps.serviceDescription) {
				onSubmit();
			} else {
				//TODO: this file would be removed after design changes for the service creation
				if (activeStep === formSteps.address) {
					const { radius, address, noneMainService, location } = formik.values;
					const requestData = {
						service_radius: radius,
						location_address: address,
						location_point: location
					};
					if (noneMainService) {
						dispatch(updateCompany(requestData));
					} else {
						dispatch(updateService(requestData));
					}
				}
				const skipStep = activeStep === formSteps.category;
				const openServiceDescriptionStep =
					(hasMainService &&
						mainServiceId &&
						activeStep === formSteps.serviceAttributes) ||
					(!hasMainService && activeStep === formSteps.serviceAttributes);
				if (formik.values.noneMainService && skipStep) {
					setActiveStep(formSteps.companyDescription);
				} else if (openServiceDescriptionStep) {
					setActiveStep(formSteps.serviceDescription);
				} else {
					setActiveStep(activeStep => ++activeStep);
				}
			}
		}
	};

	const onPrevClick = () => {
		if (
			formik.values.noneMainService &&
			activeStep === (formSteps.serviceDescription || activeStep === formSteps.address)
		) {
			setActiveStep(formSteps.category);
		} else if (hasMainService && activeStep === formSteps.serviceDescription) {
			setActiveStep(activeStep => activeStep - 2);
		} else {
			setActiveStep(activeStep => --activeStep);
		}
	};

	const onOpenService = () => {
		if (!serviceId && !formik.values.noneMainService) {
			onSubmit();
			setOpenService(true);
		} else {
			router.replace(routes.profile);
		}
	};

	useEffect(() => {
		if (companyId) {
			dispatch(fetchCompanyServices());
			dispatch(fetchCategories());
		}
		return () => {
			dispatch(clearServiceAdd());
			dispatch(clearEventTypes());
		};
	}, [companyId]);

	useEffect(() => {
		!companyLoading && activeStep !== 0 && setActiveStep(activeStep => activeStep + 2);
	}, [companyLoading]);

	useEffect(() => {
		setEnabledNextStep(checkEnabledNextStep());
	}, [formik.values, activeStep]);

	useEffect(() => {
		if (formik.values.noneMainService) {
			formik.setFieldValue("category", null);
			formik.setFieldValue("service", null);
			formik.setFieldValue("serviceAttributes", []);
		}
	}, [formik.values.noneMainService]);

	useEffect(() => {
		if (serviceId && activeStep === formSteps.serviceDescription && !openService) {
			setActiveStep(activeStep => ++activeStep);
		} else if (serviceId && openService) {
			//TODO: check this place (what page should be opened here)
			router.replace(`${routes.service}/${serviceId}`);
		}
	}, [serviceId]);

	const showPrevButton = ![
		formSteps.category,
		formSteps.imageGallery,
		formSteps.address,
		formSteps.eventTypes,
		formSteps.final
	].includes(activeStep);

	const showOpenServicePageButton = activeStep > formSteps.serviceDescription;

	const showNextButton = ![formSteps.address].includes(activeStep);

	return (
		<MainWrapper>
			<Container>
				<MainServiceWrapper>
					<Stepper activeStep={activeStep} steps={formSteps} categories={categories} />
					<Form onSubmit={formik.handleSubmit}>
						<MainServiceHolder>
							<ActiveStep
								activeStep={activeStep}
								formik={formik}
								categories={categories}
								servicesList={servicesList}
								templates={templates}
								serviceId={serviceId}
								mainServiceId={mainServiceId}
								categoryName={categoryName}
								setCategoryName={setCategoryName}
								hasMainService={hasMainService}
							/>

							<ButtonHolder>
								{showPrevButton && (
									<Button color='black' type='button' onClick={onPrevClick}>
										{t("backButton.text")}
									</Button>
								)}
								{showOpenServicePageButton && (
									<Button color='grey' onClick={onOpenService}>
										{t("openServiceButton.text")}
									</Button>
								)}
								<Button
									type='button'
									onClick={onNextClick}
									disabled={!enabledNextStep}
								>
									{showNextButton ? t("nextButton.text") : t("sendButton.text")}
								</Button>
							</ButtonHolder>

							{loading && <Loader />}
						</MainServiceHolder>
					</Form>
				</MainServiceWrapper>
			</Container>
		</MainWrapper>
	);
};

export default AddServiceForm;
