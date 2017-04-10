package ir.mhdr.lib;

import org.apache.commons.io.IOUtils;

import java.io.*;

public class Statics {
    public String getVersion()
    {
        String result="-1";
        try {
            String fileName="build.txt";
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream in = classLoader.getResourceAsStream(fileName);
            BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(in));
            String buildNumberStr= bufferedReader.readLine();
            bufferedReader.close();
            result=buildNumberStr;
        }
        catch (Exception ex)
        {
            // exception
            ex.printStackTrace();
        }
        return result;
    }
}
