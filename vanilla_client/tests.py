def checkForNull(df, col):
    return df[df[col].isnull()]
    #pyodide.runPython('Headerdf[Headerdf["UPN"].isnull()]')
