export declare function TemplateImplementation<T extends Type<any> = any>(Strategy: T, name?: string | undefined): {
    new (...args: any[]): InstanceType<T>;
};