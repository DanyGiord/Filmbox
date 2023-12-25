const CustomizeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[url(/./assets/backgrounds/account-bg.png)] bg-fixed bg-cover bg-right bg-no-repeat">
            {children}
        </div>
    );
}

export default CustomizeLayout;