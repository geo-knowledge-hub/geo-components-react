# Changes

## Version 0.5.4 (2023-10-17)

- Added support for Package specification in the links from the `UserStoriesTable`.

## Version 0.5.3 (2023-10-11)

- Improved `RelatedPackagesTable` to enable users to select the latest version of the package by clicking on its title;
- Added support for Package specification in the links from the `RelatedResourceTable`.

## Version 0.5.2 (2023-09-14)

- Updated `ExternalResourceTable` style.

## Version 0.5.1 (2023-08-31)

- Updated `RelatedPackages` behavior on mobile;
- Fixed props usage of the `LatestEvents` component.

## Version 0.5.0 (2023-08-22)

- Carousel components refactored using [React Slick](https://react-slick.neostack.com/) and [React Query v4](https://tanstack.com/query/v4);
- User stories component recreated as a `PaginableTable` (`UserStoriesTable`);
- Reviewed Storybook documentation and tests;
- Fixed responsivity in the `FilterBuilder` form;
- Emotion and Pure React Carousel removed.

## Version 0.4.12 (2023-06-08)

- Added default values support in the `ExternalResourceTable`.

## Version 0.4.11 (2023-05-23)

- Updated package dependencies;
- Fixed preview mode in the `RelatedPackagesTable`.

## Version 0.4.10 (2023-05-08)

- Updated package dependencies;
- Removed `jest-when` dependency.

## Version 0.4.9 (2023-03-13)

- Added `RelatedPackagesTable` component;
- Removed `RelatedLinksCarousel` component.

## Version 0.4.8 (2023-03-02)

- Added support for a global filter in the  `PaginableTable`;
- Added support for preview data in the `RelatedResourceTable`;
- Added support for navigation mode in the `RelatedResourceTable`.

## Version 0.4.7 (2023-02-20)

- Added `RemoteSelectField` to support customized selection from GEO Knowledge Hub APIs;
- Reviewed `VocabularySuggestionField` unique values.

## Version 0.4.6 (2023-02-16)

- Fixed duplicated values in the `VocabularySuggestionField`
- Added support to restricted resources in the related table components;
- Updated Invenio Form version.

## Version 0.4.5 (2022-12-27)

- Updated GitHub Actions environment;
- Updated dependencies.

## Version 0.4.4 (2022-10-26)

- Updated dependencies;
- Updated `User stories` component;
- Added support to initial filter params in the `FilterBuilder` component;
- Added initial version of the `Related Link` component.

## Version 0.4.3 (2022-10-09)

- Fixed `Related Table` index;
- Fixed `Related Table` title and link properties.

## Version 0.4.2 (2022-07-21)

- Changed the order of the fields in the `FilterBuilder` component.

## Version 0.4.1 (2022-07-19)

- Fixed the URL of the `Subjects API` in the `BasicSubjectsField` component.

## Version 0.4.0 (2022-07-17)

- Added Search components ([#27](https://github.com/geo-knowledge-hub/geo-components-react/issues/27))
	- `FilterBuilder`: Generic component to be used as a search query generator for the InvenioRDM Records API. Using this component, the user can create a query by defining parameters in a high-level interface. The following parameters can be used in the component to create queries:

	     - Target audience;
	     - Engagement Priorities;
	     - Resource types ([#33](https://github.com/geo-knowledge-hub/geo-components-react/issues/33));
	     - Subjects ([#34](https://github.com/geo-knowledge-hub/geo-components-react/issues/34));
	     - Authors ([#35](https://github.com/geo-knowledge-hub/geo-components-react/issues/35));
	     - GEO Work Programme Activities;
	     - Spatial search .

	- `AdvancedSearchBar`: Based on the `FilterBuilder`, the `AdvancedSearchBar` is a component in which the user can create simple or complex InvenioRDM queries. This component is intended to be used on the Front page of the GEO Knowledge Hub.

## Version 0.3.3 (2022-06-30)

- Adding Formik fields for the GEO Knowledge Hub forms ([#28](https://github.com/geo-knowledge-hub/geo-components-react/issues/28))
	- `Engagement Priority field`: Enable users to select multiple engagement priorities available in the instance;
	- `Target Audience field`: Enable users to select target audiences;
	- `Work Programme`: Enable users to choose one GEO Work Programme Activity.
- These fields are imported from [GEO Deposit React](https://github.com/geo-knowledge-hub/geo-deposit-react)

## Version 0.3.2 (2022-05-25)

- Fixed empty field error ([#24](https://github.com/geo-knowledge-hub/geo-components-react/issues/24)) in the `RelatedResourceTable` and `UserStoryCarousel` components.

## Version 0.3.1 (2022-05-24)

- Fixed pagination error ([#18](https://github.com/geo-knowledge-hub/geo-components-react/issues/18)) in the `RelatedResourceTable` component;
- Added GEO Work Programme Badge in the `RelatedResourceTable` results item.

## Version 0.3.0 (2022-05-22)

- Package structure reorganized. With this change, the package is divided by component type, and for each type, there are the base components, their derivations, and thematic uses. For example, for table components, you have the following structure:
	- `base`: Directory with the base components;
	- `moldure`: Directory with derivations and junctions of the base components;
	- `thematic`: Directory with components ready for use on the different pages of GEO Knowledge Hub.

- All components have been rewritten and improved. The following components are now available:
	- Table for presenting Knowledge package-related resources. Its main features are:
		- Indexing and searching data in the browser via [minisearch](https://www.npmjs.com/package/minisearch);
		- Faceted search by resource type.
	- Table to store external related works with sort support;
	- Image carouse with lazy load and cache.

- Added tests for components;
- Introduction of Storybook as the development environment of the package;
- [Glider.js](https://nickpiscitelli.github.io/Glider.js/) removed. Now, the carousels are implemented using [pure-react-carousel](https://www.npmjs.com/package/pure-react-carousel).

## Version 0.2.1 (2022-05-09)

- Package renamed to `@geo-knowledge-hub/geo-components-react` using [scoped pattern](https://docs.npmjs.com/cli/v8/using-npm/scope)

## Version 0.2.0 (2022-04-24)

- `User Stories Carousel` component based on [pure-react-carousel](https://www.npmjs.com/package/pure-react-carousel);
- `Engagement Priorities Carousel` component based on [Glider.js](https://nickpiscitelli.github.io/Glider.js/)
