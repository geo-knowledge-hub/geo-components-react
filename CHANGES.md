# Changes

## Version 0.3.1 (2022-05-23)

- Fixed pagination error ([#18](https://github.com/geo-knowledge-hub/geo-components-react/issues/18)) in the `RelatedResourceTable` component.

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
