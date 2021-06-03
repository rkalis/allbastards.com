## Contributing

### Adding newly minted bastards

1. Update the `HIGHEST_BASTARD_ID` in `src/utils/constants.ts` to the new highest index
2. Update generated files
    ```
    ts-node --project ./tsconfig.node.json scripts/download_images.ts
    ts-node --project ./tsconfig.node.json scripts/download_metadata.ts
    ts-node --project ./tsconfig.node.json scripts/convert_to_webp.ts
    ts-node --project ./tsconfig.node.json scripts/create_indexes.ts
    ```
